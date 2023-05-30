from flask import Blueprint

from controllers.users import index, create

users = Blueprint('users', __name__)
users.route('/')(index)
users.route('/create/', methods=['POST'])(create)