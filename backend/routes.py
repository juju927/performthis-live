from flask import Blueprint

from controllers.users import login, refresh, index, get_user, create

users = Blueprint('users', __name__)
users.route('/login', methods=['POST'])(login)
users.route('/refresh', methods=['POST'])(refresh)
# users.route('/protected')@flask_praetorian.auth_required(protected)
users.route('/')(index)
users.route('/')(get_user)
users.route('/create/', methods=['POST'])(create)