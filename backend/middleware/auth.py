from flask import request, make_response, jsonify
import jwt
from functools import wraps

from ..config import SECRET_KEY
from ..models.User import User

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # ensure the jwt-token is passed with the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].replace('Bearer ', '')
        if not token: # throw error if no token provided
            return make_response(jsonify({"message": "A valid token is missing!"}), 401)
        try:
           # decode the token to obtain user id
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            print('data', data)
            current_user = User.query.filter_by(id=data['id']).first()
        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Invalid token!"}), 401)
         # Return the user information attached to the token
        return f(current_user, *args, **kwargs)
    return decorator