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
    song_id = db.Column(db.UUID, db.ForeignKey(
        'songs.id'), nullable=False)
    added_at = db.Column(db.DateTime, nullable=False)
    requester_so = db.Column(db.Text)
    is_completed = db.Column(db.Boolean, nullable=False)

    def __init__(self, **kwargs):
        self.live_session_id = kwargs.get('live_session_id')
        self.song_id = kwargs.get('song_id')
        self.added_at = datetime.datetime.now()
        self.requester_so = ''
        self.is_completed = False
        
    def add_requester_so(self, requester_so):
        self.requester_so += f",,, {requester_so}"


class SongQueueSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = SongQueue
