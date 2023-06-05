from uuid import uuid4
import datetime
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class SongQueue(db.Model):
    __tablename__ = "song_queue"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    live_session_id = db.Column(db.UUID, db.ForeignKey(
        'live_sessions.id'), nullable=False)
    user_song_id = db.Column(db.UUID, db.ForeignKey(
        'user_songs.id'), nullable=False)
    added_at = db.Column(db.DateTime, nullable=False)
    requester_so = db.Column(db.Text)
    is_completed = db.Column(db.Boolean, nullable=False)

    def __init__(self):
        self.added_at = datetime.datetime.now()
        self.is_completed = False


class SongQueueSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = SongQueue
