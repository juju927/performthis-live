from ..models.User import User, UserSchema
from flask import request


# only works for one item being returned
user_schema = UserSchema()
# works for more than one item being returned
users_schema = UserSchema(many=True)


def get_all_users():
    users = User.query.all()  # sqlalchemy db model
    result = users_schema.dump(users)
    return result


def get_user(search_key):
    user = User.query.filter((User.username==search_key) | (User.email==search_key)).one_or_none()
    result = user_schema.dump(user)
    return result


