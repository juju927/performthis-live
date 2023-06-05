from flask import Blueprint

from .controllers.test import home
from .controllers.auth import create_user, login_user
from .controllers.users import get_all_users, get_user
from .controllers.songs import get_all_songs, get_songs_by_artist_or_title, create_song

test = Blueprint('test', __name__)
test.route('/')(home)

auth = Blueprint('auth', __name__)
auth.route('/create/', methods=['POST'])(create_user)
auth.route('/login/', methods=['POST'])(login_user)


users = Blueprint('users', __name__)
users.route('/')(get_all_users)
users.route('/<search_key>')(get_user)

songs = Blueprint('songs', __name__)
songs.route('/')(get_all_songs)
songs.route('/<search_key>')(get_songs_by_artist_or_title)
songs.route('/create/', methods=['POST'])(create_song)

