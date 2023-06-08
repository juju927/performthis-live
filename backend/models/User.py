from uuid import uuid4
import datetime
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_bcrypt import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import UUID
from marshmallow import fields


from ..extensions import db
from .UserProfile import UserProfileSchema

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_performer = db.Column(db.Boolean, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, **kwargs):
        self.username = kwargs.get("username")
        self.email = kwargs.get("email")
        self.password = kwargs.get("password")
        self.is_performer = kwargs.get("is_performer")
        self.registered_on = datetime.datetime.now()

    def __repr__(self):
        """
        The __repr__ function is used to return a string representation of the object
        :return: The username of the user.
        """
        return "<User {}>".format(self.username)

    def hash_password(self):
        """
        It takes the password that the user has entered, hashes it, and then stores the hashed password in
        the database
        """
        self.password = generate_password_hash(self.password).decode("utf8")

    def check_password(self, password):
        """
        It takes a plaintext password, hashes it, and compares it to the hashed password in the database
        
        :param password: The password to be hashed
        :return: The password is being returned.
        """
        return check_password_hash(self.password, password)
    
   
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True
        exclude = ["password"] # so password is not returned when queried

class UserPublicSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
    fields = ('username', 'is_performer')

class UserPublicProfileSchema(SQLAlchemyAutoSchema):
    userPublicData = fields.Nested(UserPublicSchema)
    userProfileData = fields.Nested(UserProfileSchema)


    #     class SideBySideSchema(ma.ModelSchema):
    # packMetaData = fields.Nested(PackMatDataSchema)
    # colorData = fields.Nested(ColorDataSchema)
