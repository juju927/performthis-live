from uuid import uuid4
from models.Song import Song, SongSchema
from flask import request
from extensions import db

song_schema = SongSchema()
songs_schema = SongSchema(many=True)

# for optional body parameters
def optional(key, dict):
    if key in dict:
        return dict.key
    else:
        return ""

def create_song():
    request_data = request.get_json()

    id = uuid4()
    new_song = Song(
        id = id,
        title = request_data['title'],
        artist = request_data['artist'],
        alt_title_1 = optional('alt_title_1', request_data),
        alt_title_2 = optional('alt_title_2', request_data), # do if / dictionary comprehension
    )

    db.session.add(new_song)
    db.session.commit()

    song = Song.query.get(id)
    response = song_schema.dump(song)
    return response

def get_all_songs():
    songs = Song.query.all()
    result = songs_schema.dump(songs)
    return result

def get_songs_by_artist(artist):
    songs = Song.query.filter_by(artist= artist)
    result = songs_schema.dump(songs)
    return result

def get_songs_by_title(title):
    songs = Song.query.filter_by(title= title)
    result = songs_schema.dump(songs)
    return result