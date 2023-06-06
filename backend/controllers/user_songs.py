from ..models.UserSong import UserSong, UserSongSchema
from ..models.Song import Song, SongSchema
from ..models.User import User
from flask import request
from ..extensions import db
from sqlalchemy.dialects.postgresql import UUID

from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

user_song_schema = UserSongSchema()
user_songs_schema = UserSongSchema(many=True)

song_schema = SongSchema()

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

def get_user_songs(user_id):
    songs = UserSong.query.filter(UserSong.user_id == user_id)
    result = user_songs_schema.dump(songs)
    return result

def post_user_songs():
    request_data = request.get_json()

    check_song_in_database = Song.query.filter((Song.artist.ilike(request_data['artist'])), ((Song.title.ilike(request_data['title'])) | (Song.alt_title_1.ilike(request_data['title'])) | (Song.alt_title_2.ilike(request_data['title'])))).first()

    if check_song_in_database:
        song_id = check_song_in_database.id
        print(song_id)
        
        check_song_in_user_songs = UserSong.query.filter(UserSong.song_id == song_id, UserSong.user_id == request_data['user_id']) 
        print(check_song_in_user_songs)
        if check_song_in_user_songs:
            return generate_response(
              message="Song already in user list!", status=HTTP_400_BAD_REQUEST
            )
    else:
        new_song = Song(
          title = request_data['title'],
          artist = request_data['artist'],
          alt_title_1 = optional('alt_title_1', request_data),
          alt_title_2 = optional('alt_title_2', request_data), 
        )

        db.session.add(new_song)
        db.session.commit()

        song_id = new_song.song_id

    new_user_song = UserSong(
        user_id = request_data['user_id'],
        song_id = song_id
    )

    db.session.add(new_user_song)
    db.session.commit()

    return generate_response(
        message="Song added", status=HTTP_200_OK
    )

