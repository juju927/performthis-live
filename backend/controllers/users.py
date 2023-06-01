from uuid import uuid4
from models.User import User, UserSchema
from flask import request

from extensions import db, guard, bcrypt

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
  

def index():
    users = User.query.all() # sqlalchemy db model
    result = users_schema.dump(users)
    return result

def get_user(id):
    user = User.query.get(id)
    result = user_schema.dump(user)
    return result

# def index2():
#     users = User.query.join(tablename, id=tablename2.user_id).filter()

def create():
    request_data = request.get_json()

    if request_data['role'] == "performer":
        role_value = "user, performer"

    id = uuid4()
    new_account = User(
        id = id,
        username = request_data['username'],
        email = request_data['email'],
        password = request_data['password'],  
        role = role_value
        )
    
    db.session.add(new_account)
    db.session.commit()

    user = User.query.get(id)
    response = user_schema.dump(user)
    return response

