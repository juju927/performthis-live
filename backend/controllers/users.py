from uuid import uuid4
from ..models.User import User, UserSchema
from flask import request
import flask_praetorian

from ..extensions import db, guard, bcrypt

# only works for one item being returned
user_schema = UserSchema()
# works for more than one item being returned
users_schema = UserSchema(many=True)

def login():
    req = request.get_json(force=True)

    username = req.get('username')
    password = bcrypt.generate_password_hash(req.get('password'))
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


def refresh():
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200


@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}



def get_all_users():
    users = User.query.all()  # sqlalchemy db model
    result = users_schema.dump(users)
    return result


def get_user(search_key):
    user = User.query.filter((User.username==search_key) | (User.email==search_key)).one_or_none()
    result = user_schema.dump(user)
    return result


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
