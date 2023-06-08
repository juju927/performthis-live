from flask import request

from ..models.LiveSession import LiveSession, LiveSessionSchema
from ..extensions import db

from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND 

live_session_schema = LiveSessionSchema()
live_sessions_schema = LiveSessionSchema(many=True)

def get_all_live_sessions():
    sessions = LiveSession.query.all()
    result = live_sessions_schema.dump(sessions)
    return result


def post_live_session():
    request_data = request.get_json()

    check_active_session = LiveSession.query.filter(LiveSession.user_id == request_data['user_id'], LiveSession.is_completed == False).one_or_none()

    if check_active_session is not None:
        return generate_response(
            data=check_active_session.id, message="there is an existing live session", status=HTTP_400_BAD_REQUEST
        )

    else:
        new_live_session = LiveSession(
            user_id = request_data['user_id']
        )

        db.session.add(new_live_session)
        db.session.commit()

        return generate_response(
            data=new_live_session.id, message="new live session started"
        )

def get_user_live_sessions():
    request_data = request.get_json()

    sessions = LiveSession.query.filter(LiveSession.user_id == request_data['user_id'])

    result = live_sessions_schema.dump(sessions)
    return result

def get_live_session():
    request_data = request.get_json()

    session = LiveSession.query.filter(LiveSession.id == request_data['session_id'])

    result = live_session_schema.dump(session)
    return result

def end_live_session():
    request_data = request.get_json()

    session = LiveSession.query.filter(LiveSession.id == request_data['session_id'], LiveSession.is_completed == False).one_or_none()

    if session is None:
        return generate_response(
            message="live session not found", status=HTTP_404_NOT_FOUND
        )
        
    else:
        LiveSession.query.filter(LiveSession.id == request_data['session_id']).update({'is_completed': True})
        db.session.commit()

        return generate_response(
          message="live session ended"
        )
    
    
def delete_live_session():
    request_data = request.get_json()

    session = LiveSession.query.filter(LiveSession.id == request_data['session_id'])

    if session is None:
        return generate_response(
            message="live session not found", status=HTTP_404_NOT_FOUND
        )
    
    else:
        LiveSession.query.filter(LiveSession.id == request_data['session_id']).delete()
        db.session.commit()

        return generate_response(
            message="live session deleted"
        )


