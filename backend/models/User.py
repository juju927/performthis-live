from uuid import uuid4
from db import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

#  creates the table
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.UUID, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    # date_created = db.Column(db.DateTime, auto_now_add=True)

#  creates item in the table
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ["password"] # this line is so password is not returned when queried
