from ..models.Song import Song, SongSchema
from flask import request
from ..extensions import db

song_schema = SongSchema()
songs_schema = SongSchema(many=True)

# for optional body parameters
def optional(key, dict):
    if key in dict.keys():
        return dict[key]
    else:
        return ""

def create_song():
    request_data = request.get_json()

    new_song = Song(
        title = request_data['title'],
        artist = request_data['artist'],
        alt_title_1 = optional('alt_title_1', request_data),
        alt_title_2 = optional('alt_title_2', request_data), 
    )

    db.session.add(new_song)
    db.session.commit()

    response = song_schema.dump(new_song)
    return response

def get_all_songs():
    songs = Song.query.all()
    result = songs_schema.dump(songs)
    return result

def get_songs_by_artist_or_title(search_key):
    search = f"%{search_key}%"
    songs = Song.query.filter((Song.artist.ilike(search) | Song.title.ilike(search)))
    # ilike makes it like BUT case insensitive
    result = songs_schema.dump(songs)
    return result