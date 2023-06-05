from uuid import uuid4
import datetime
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from ..extensions import (db, bcrypt)
from sqlalchemy.dialects.postgresql import UUID

#  creates the table


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default="true")

    def __init__(self, username, email, password, role="user"):
        self.username = username
        self.email = email
        self.registered_on = datetime.datetime.now()

   
#  creates item in the table


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        # exclude = ["password"] # so password is not returned when queried
