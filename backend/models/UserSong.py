from uuid import uuid4
# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested
from sqlalchemy.dialects.postgresql import UUID


from .Song import SongSchema
from ..extensions import db, mm


class UserSong(db.Model):
    __tablename__ = "user_songs"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.UUID, db.ForeignKey('users.id'))
    song_id = db.Column(db.UUID, db.ForeignKey('songs.id'))
    # song = db.relationship('Song', backref='song', lazy=True)


class UserSongSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = UserSong
        include_fk = True
        load_instance = True


class UserSongDetailsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = UserSong
        include_fk = True

    song = mm.Nested(SongSchema, attribute='usersong')
