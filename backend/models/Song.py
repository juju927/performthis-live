from uuid import uuid4
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from ..extensions import db 
from sqlalchemy.dialects.postgresql import UUID

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    title = db.Column(db.String(), nullable=False)
    alt_title_1 = db.Column(db.String)
    alt_title_2 = db.Column(db.String)
    artist = db.Column(db.String, nullable=False)
    
#  creates item in the table
class SongSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Song


