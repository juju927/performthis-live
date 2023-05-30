from flask import Blueprint

from controllers.users import index

users = Blueprint('users', __name__)
users.route('/')(index)