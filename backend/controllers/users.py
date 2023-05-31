from uuid import uuid4
from models.User import User, UserSchema
from flask import request
# from db import db
from extensions import db

# only works for one item being returned
user_schema = UserSchema()
# works for more than one item being returned
users_schema = UserSchema(many=True)

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

    id = uuid4()
    new_account = User(
        id = id,
        username = request_data['username'],
        email = request_data['email'],
        password = request_data['password'],     
        )
    
    # this doesnt use the migrate stuff?
    db.session.add(new_account)
    db.session.commit()

    user = User.query.get(id)
    response = user_schema.dump(user)
    return response

