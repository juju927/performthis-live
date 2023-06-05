from uuid import uuid4
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class UserProfile(db.Model):
    __tablename__ = "user_profiles"

    user_id = db.Column(db.UUID, db.ForeignKey('users.id'), primary_key=True)
    display_name = db.Column(db.String(25), nullable=False)
    description = db.Column(db.Text)
    

class UserProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserProfile