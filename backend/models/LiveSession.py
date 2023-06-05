from uuid import uuid4
import datetime
from ..extensions import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID


class LiveSession(db.Model):
    __tablename__ = "live_sessions"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.UUID, db.ForeignKey('users.id'))

    def __init__(self):
        self.added_at = datetime.datetime.now()
        self.is_completed = False


class LiveSessionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = LiveSession
