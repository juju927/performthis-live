from uuid import uuid4
import datetime
# from flask_bcrypt import Bcrypt
from db import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema





#  creates the table
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.UUID, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_performer = db.Column(db.Boolean, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)


    def __init__(self, id, username, email, password, is_performer=False):
        self.id = id,
        self.username = username
        self.email = email
        # self.password = bcrypt.generate_password_hash(password)
        self.password = password
        self.is_performer = is_performer
        self.registered_on = datetime.datetime.now()

#  creates item in the table
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ["password"] # this line is so password is not returned when queried
