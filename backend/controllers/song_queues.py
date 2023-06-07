from flask import request

from ..models.SongQueue import SongQueue, SongQueueSchema
from ..models.LiveSession import LiveSession
from ..models.UserSong import UserSong
from ..extensions import db

from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

song_queue_schema = SongQueueSchema()
song_queues_schema = SongQueueSchema(many=True)

def get_all_song_queues():
    queues = SongQueue.query.all()
    result = song_queues_schema.dump(queues)
    return result

def post_song_to_queue():
    request_data = request.get_json()

    check_active_session = LiveSession.query.filter(LiveSession.id == request_data['live_session_id'], LiveSession.is_completed == False).one_or_none()

    if check_active_session is None:
        return generate_response(
            message="live session not found", status=HTTP_404_NOT_FOUND
        )

    check_user_song = UserSong.query.filter(UserSong.id == request_data['user_song_id']).one_or_none()

    if check_user_song is None:
        return generate_response(
            message="user song not found", status=HTTP_404_NOT_FOUND
        )

    check_song_in_session = SongQueue.query.filter(SongQueue.live_session_id == request_data['live_session_id'], SongQueue.user_song_id == request_data['user_song_id'], SongQueue.is_completed == False).one_or_none()

    # check again this might not be possible
    if check_song_in_session is not None:
        the_song = SongQueue.query.filter(SongQueue.live_session_id == request_data['live_session_id'], SongQueue.user_song_id == request_data['user_song_id'], SongQueue.is_completed == False).first()
        the_song.add_requester_so(request_data['requester_so'])
        db.session.commit()

        return generate_response(
            data=song_queue_schema.dump(the_song), message="song already in queue - request added to existing song", status=HTTP_202_ACCEPTED
        )

    else:

      new_song_queue = SongQueue(
          live_session_id = request_data['live_session_id'],
          user_song_id = request_data['user_song_id']
      )
      new_song_queue.add_requester_so(request_data['requester_so'])

      db.session.add(new_song_queue)
      db.session.commit()

    return generate_response(
        data=song_queue_schema.dump(new_song_queue), message="song added to queue", status=HTTP_201_CREATED
    )

def get_song_queue():
    request_data = request.get_json()

    queue = SongQueue.query.filter(SongQueue.live_session_id == request_data['live_session_id']).one_or_none()

    if queue is None:
        return generate_response(
            message="session not found", status=HTTP_404_NOT_FOUND
        )
    
    else:
        result = song_queues_schema.dump(queue)
    return result

def mark_song_as_complete():
    request_data = request.get_json()

    song = SongQueue.query.filter(SongQueue.id == request_data['song_queue_id']).one_or_none()

    if song is None:
        return generate_response(
            message="song not found", status=HTTP_404_NOT_FOUND
        )
    
    else:
        SongQueue.query.filter(SongQueue.id == request_data['song_queue_id']).update({"is_completed": True })
        db.session.commit()
        return generate_response(
            message="song marked as complete"
        )

def delete_song_from_queue():
    request_data = request.get_json()

    song = SongQueue.query.filter(SongQueue.id == request_data['song_queue_id'])

    if song is None:
        return generate_response(
            message="song not found", status=HTTP_404_NOT_FOUND
        )
    
    else:
        SongQueue.query.filter(SongQueue.id == request_data['song_queue_id']).delete()
        db.session.commit()

        return generate_response(
            message="song removed from queue"
        )

