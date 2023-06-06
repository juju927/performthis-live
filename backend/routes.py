from flask import Blueprint

from .controllers.test import home
from .controllers.auth import register_user, login_user
from .controllers.users import get_all_users, get_user
from .controllers.songs import get_all_songs, get_songs_by_artist_or_title, create_song
from .controllers.user_songs import get_all_user_songs, get_user_songs, post_user_songs

test = Blueprint('test', __name__)
test.route('/')(home)

auth = Blueprint('auth', __name__)
auth.route('/register/', methods=['POST'])(register_user)
auth.route('/login/', methods=['POST'])(login_user)


users = Blueprint('users', __name__)
users.route('/')(get_all_users)
users.route('/<search_key>')(get_user)

songs = Blueprint('songs', __name__)
songs.route('/', methods=['GET'])(get_all_songs)
songs.route('/', methods=['POST'])(create_song)
songs.route('/<search_key>')(get_songs_by_artist_or_title)

user_songs = Blueprint('user_songs', __name__)
user_songs.route('/', methods=['GET'])(get_all_user_songs) 
user_songs.route('/', methods=['POST'])(post_user_songs)
user_songs.route('/<user_id>/')(get_user_songs)

