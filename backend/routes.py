from flask import Blueprint

from controllers.users import login, refresh, index, get_user, create
from controllers.songs import get_all_songs, get_one_song, create_song

users = Blueprint('users', __name__)
users.route('/login', methods=['POST'])(login)
users.route('/refresh', methods=['POST'])(refresh)
# users.route('/protected')@flask_praetorian.auth_required(protected)
users.route('/')(index)
users.route('/')(get_user)
users.route('/create/', methods=['POST'])(create)

songs = Blueprint('songs', __name__)
songs.route('/')(get_all_songs)
songs.route('/create/', methods=['POST'])(create_song)
