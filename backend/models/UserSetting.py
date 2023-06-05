from uuid import uuid4
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class UserSetting(db.Model):
    __tablename__ = "user_settings"

    user_id = db.Column(db.UUID, db.ForeignKey('users.id'), primary_key=True)
    theme = db.Column(db.String(15))


class UserSettingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserSetting
