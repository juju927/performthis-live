from uuid import uuid4
import datetime
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class LiveSession(db.Model):
    __tablename__ = "live_sessions"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.UUID, db.ForeignKey('users.id'))
    started_at = db.Column(db.DateTime, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)

    def __init__(self, user_id):
        self.user_id = user_id
        self.started_at = datetime.datetime.now()
        self.is_completed = False


class LiveSessionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = LiveSession
