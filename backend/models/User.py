from uuid import uuid4
import datetime
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from extensions import (db, bcrypt) 

#  creates the table
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.UUID, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    roles = db.Column(db.String, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default="true")

    def __init__(self, id, username, email, password, role="user"):
        self.id = id,
        self.username = username
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.roles = role
        self.registered_on = datetime.datetime.now()

    @property
    def identity(self):
        # required by praetorian
        return self.id

    @property
    def rolenames(self):
        # required by praetorian
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        # required by praetorian
        return self.password

    @classmethod
    def lookup(cls, username):
        #required by praetorian
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        # required by praetorian
        return cls.query.get(id)

    def is_valid(self):
        return self.is_active    

#  creates item in the table
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        # exclude = ["password"] # so password is not returned when queried



