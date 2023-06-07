from flask import Blueprint

from .controllers.test import home
from .controllers.auth import register_user, login_user
from .controllers.users import get_all_users, get_user
from .controllers.songs import get_all_songs, get_songs_by_artist_or_title, create_song
from .controllers.user_songs import get_all_user_songs, get_user_songs, post_user_songs
from .controllers.live_sessions import get_all_live_sessions, post_live_session, get_user_live_sessions, get_live_session, end_live_session, delete_live_session
from .controllers.song_queues import get_all_song_queues, get_song_queue, post_song_to_queue, mark_song_as_complete, delete_song_from_queue

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
songs.route('/<search_key>/')(get_songs_by_artist_or_title)

user_songs = Blueprint('user_songs', __name__)
user_songs.route('/', methods=['GET'])(get_all_user_songs) 
user_songs.route('/', methods=['POST'])(post_user_songs)
user_songs.route('/user/')(get_user_songs)

live_sessions = Blueprint('live_sessions', __name__)
live_sessions.route('/', methods=['GET'])(get_all_live_sessions)
live_sessions.route('/', methods=['POST'])(post_live_session)
live_sessions.route('/user/')(get_user_live_sessions)
live_sessions.route('/session/', methods=['GET'])(get_live_session)
live_sessions.route('/session/', methods=['PATCH'])(end_live_session)
live_sessions.route('/session/', methods=['DELETE'])(delete_live_session)

song_queues = Blueprint('song_queues', __name__)
song_queues.route('/', methods=['GET'])(get_all_song_queues)
song_queues.route('/session/', methods=['GET'])(get_song_queue)
song_queues.route('/session/', methods=['POST'])(post_song_to_queue)
song_queues.route('/session/', methods=['PATCH'])(mark_song_as_complete)
song_queues.route('/session/', methods=['DELETE'])(delete_song_from_queue)


