from uuid import uuid4
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class UserSong(db.Model):
    __tablename__ = "user_songs"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.UUID, db.ForeignKey('users.id'))
    song_id = db.Column(db.UUID, db.ForeignKey('songs.id'))


class UserSongSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserSong
