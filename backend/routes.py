from flask import Blueprint

from controllers.users import index, get_user, create

users = Blueprint('users', __name__)
users.route('/')(index)
users.route('/')(get_user)
users.route('/create/', methods=['POST'])(create)