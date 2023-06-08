from flask import request

from ..models.LiveSession import LiveSession, LiveSessionSchema
from ..models.User import User
from ..extensions import db

from ..middleware.auth import token_required
from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND 

live_session_schema = LiveSessionSchema()
live_sessions_schema = LiveSessionSchema(many=True)

def get_all_live_sessions():
    sessions = LiveSession.query.all()
    result = live_sessions_schema.dump(sessions)
    return result

@token_required
def post_live_session(current_user):
    check_active_session = LiveSession.query.filter(LiveSession.user_id == current_user.id, LiveSession.is_completed == False).one_or_none()

    if check_active_session is not None:
        return generate_response(
            data=check_active_session.id, message="there is an existing live session", status=HTTP_400_BAD_REQUEST
        )

    else:
        new_live_session = LiveSession(
            user_id = current_user.id
        )

        db.session.add(new_live_session)
        db.session.commit()

        return generate_response(
            data=live_session_schema.dump(new_live_session), message="new live session started", status=HTTP_200_OK
        )

def get_user_live_sessions():
    request_data = request.get_json()

    sessions = LiveSession.query.filter(LiveSession.user_id == request_data['user_id'])

    result = live_sessions_schema.dump(sessions)
    return result

def get_live_session():
    request_data = request.get_json()

    user = User.query.filter(User.username == request_data['username']).first()

    if user is None:
        return generate_response(
            message="user not found", status=HTTP_404_NOT_FOUND
        )

    session = LiveSession.query.filter(LiveSession.user_id == user.id, LiveSession.is_completed == False).first()
    print(session)

    result = live_session_schema.dump(session)
    return result

@token_required
def end_live_session(current_user):
    request_data = request.get_json()

    session = LiveSession.query.filter(LiveSession.id == request_data['session_id'], LiveSession.is_completed == False).one_or_none()

    if session is None:
        return generate_response(
            message="live session not found", status=HTTP_404_NOT_FOUND
        )

    if session.user_id != current_user.id:
        return generate_response(
            message="not authorised to end session", status=HTTP_403_FORBIDDEN
        ) 

    else:
        LiveSession.query.filter(LiveSession.id == request_data['session_id']).update({'is_completed': True})
        db.session.commit()

        return generate_response(
          message="live session ended", status=HTTP_200_OK
        )
    
@token_required 
def delete_live_session(current_user):
    request_data = request.get_json()

    session = LiveSession.query.filter(LiveSession.id == request_data['session_id']).first()

    if session is None:

        return generate_response(
            message="live session not found", status=HTTP_404_NOT_FOUND
        )
    
    if session.user_id != current_user.id:

        return generate_response(
            message="not authorised to delete session", status=HTTP_403_FORBIDDEN
        ) 
    
    else:

        LiveSession.query.filter(LiveSession.id == request_data['session_id']).delete()
        db.session.commit()

        return generate_response(
            message="live session deleted", status=HTTP_200_OK
        )


