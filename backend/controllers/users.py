from flask import request

from ..models.User import User, UserSchema
from ..extensions import db

from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

user_schema = UserSchema()
users_schema = UserSchema(many=True)

def get_all_users():
    users = User.query.all() 
    result = users_schema.dump(users)
    return result


def get_user():
    request_data = request.get_json()

    user = User.query.filter_by(**request_data).one_or_none()
    
    if user is None:
        return generate_response(
            message="user not found", status=HTTP_404_NOT_FOUND
        )
    
    result = user_schema.dump(user)
    return result

def patch_user():
    request_data = request.get_json()

    user = User.query.filter(User.id == request_data['user_id']).first()

    if user is None:
        return generate_response(
            message="user not found", status=HTTP_404_NOT_FOUND
        )
 
    User.query.filter(User.id == request_data['user_id']).update({'username': request_data['username']})
    db.session.commit()

    return generate_response(
        message="user updated"
    )
