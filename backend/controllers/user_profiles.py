from flask import request

from ..models.UserProfile import UserProfile, UserProfileSchema
from ..models.User import User, UserSchema
from ..extensions import db

from ..utilities.common import generate_response
from ..utilities.http_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

user_profile_schema = UserProfileSchema()
user_profiles_schema = UserProfileSchema(many=True)

# for optional body parameters
def optional(key, dict):
    if key in dict.keys():
        return dict[key]
    else:
        return ""
    
def get_user_profile():
    request_data = request.get_json()

    profile = UserProfile.query.filter(UserProfile.user_id == request_data['user_id']).first()
    result = user_profile_schema.dump(profile)
    return result

def update_user_profile():
    request_data = request.get_json()

    user = User.query.filter(User.id == request_data['user_id']).first()

    if user is None:
        return generate_response(
            message="user id invalid", status=HTTP_404_NOT_FOUND
        )

    profile = UserProfile.query.filter(UserProfile.user_id == request_data['user_id']).first()

    if profile is None:
        new_user_profile = UserProfile(
            user_id = request_data['user_id'],
            display_name = request_data['display_name'],
            description = request_data['description']
        )

        db.session.add(new_user_profile)
        db.session.commit()
        return generate_response(
            message="user profile added"
        )
    
    else:
        UserProfile.query.filter(UserProfile.user_id == request_data['user_id']).update({"display_name": request_data['display_name'], "description": request_data['description'] })
        db.session.commit()
        return generate_response(
            message="user profile updated"
        )