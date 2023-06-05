from flask import Blueprint

from .controllers.test import home
from .controllers.users import login, refresh, get_all_users, get_user, create_user
from .controllers.songs import get_all_songs, get_songs_by_artist_or_title, create_song

test = Blueprint('test', __name__)
test.route('/')(home)
test.route('/login', methods=['POST'])(login)
test.route('/refresh', methods=['POST'])(refresh)


users = Blueprint('users', __name__)
# users.route('/protected')@flask_praetorian.auth_required(protected)
users.route('/')(get_all_users)
users.route('/<search_key>')(get_user)
users.route('/create/', methods=['POST'])(create_user)

songs = Blueprint('songs', __name__)
songs.route('/')(get_all_songs)
songs.route('/<search_key>')(get_songs_by_artist_or_title)
songs.route('/create/', methods=['POST'])(create_song)

