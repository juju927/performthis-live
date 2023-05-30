from uuid import uuid4
from models.User import User, UserSchema
from flask import request
from db import db

# only works for one
user_schema = UserSchema()
# add this line to make it work for many
users_schema = UserSchema(many=True)

def index():
    users = User.query.all() # sqlalchemy db model
    result = users_schema.dump(users)
    return result


# def index2():
#     users = User.query.join(tablename, id=tablename2.user_id).filter()

def create():
    request_form = request.get_json()

    id = uuid4()
    new_account = User(
        id = id,
        username = request_form['username'],
        email = request_form['email'],
        password = request_form['password'],     
        )
    
    db.session.add(new_account)
    db.session.commit()

    user = User.query.get(id)
    response = user_schema.dump(user)
    return response