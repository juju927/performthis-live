from flask import request

from ..models.UserSong import UserSong, UserSongSchema, UserSongDetailsSchema
from ..models.Song import Song, SongSchema
from ..extensions import db

from ..middleware.auth import token_required
from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

user_song_schema = UserSongSchema()
user_songs_schema = UserSongSchema(many=True)
user_songs_details_schema = UserSongDetailsSchema(many=True)

song_schema = SongSchema()
songs_schema = SongSchema(many=True)

# for optional body parameters


def optional(key, dict):
    if key in dict.keys():
        return dict[key]
    else:
        return ""


def get_all_user_songs():
    songs = UserSong.query.all()
    result = user_songs_schema.dump(songs)
    return result


def get_user_songs():
    request_data = request.get_json()

    songs = db.session.query(Song).join(UserSong).filter(
    UserSong.user_id == request_data['user_id']).all()
    # songs = UserSong.query.with_entities(UserSong.song_id, UserSong.user_id, UserSong.id, Song.title, Song.artist).join(
    #     Song).filter(UserSong.user_id == request_data['user_id']).all()
    # print(songs)

    # result = user_songs_details_schema.dump(songs)
    result = songs_schema.dump(songs)
    return result


@token_required
def post_user_songs(current_user):
    request_data = request.get_json()

    check_song_in_database = Song.query.filter((Song.artist.ilike(request_data['artist'])), ((Song.title.ilike(request_data['title'])) | (
        Song.alt_title_1.ilike(request_data['title'])) | (Song.alt_title_2.ilike(request_data['title'])))).one_or_none()

    #  if song is alr in song database, extract its id
    if check_song_in_database is not None:
        song_id = check_song_in_database.id

        # if song is alr in user's song list, escape the function
        check_song_in_user_songs = UserSong.query.filter(
            UserSong.song_id == song_id, UserSong.user_id == current_user.id).one_or_none()

        if check_song_in_user_songs is not None:
            return generate_response(
                message="Song already in user list!", status=HTTP_400_BAD_REQUEST
            )

    # if song is not alr in song database, make a new entry in the song database
    else:
        new_song = Song(
            title=request_data['title'],
            artist=request_data['artist'],
            alt_title_1=optional('alt_title_1', request_data),
            alt_title_2=optional('alt_title_2', request_data),
        )

        db.session.add(new_song)
        db.session.commit()

        # and extract the new song id from the song database
        song_id = new_song.id

    # create new entry in user songs
    new_user_song = UserSong(
        user_id=current_user.id,
        song_id=song_id
    )

    db.session.add(new_user_song)
    db.session.commit()

    return generate_response(
        message="Song added", status=HTTP_200_OK
    )
