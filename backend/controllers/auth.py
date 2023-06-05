from ..models.User import User, UserSchema
from ..extensions import db
from flask import request

user_schema = UserSchema()

def create_user():
    request_data = request.get_json()

    if "role" in request_data:
        role_value = "user, performer"
    else:
        role_value = "user"

    new_account = User(
        username=request_data['username'],
        email=request_data['email'],
        password=request_data['password'],
        role=role_value
    )

    db.session.add(new_account)
    db.session.commit()

    # user = new_account
    response = user_schema.dump(new_account)
    return response
