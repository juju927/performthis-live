from models.User import User, UserSchema

# only works for one
user_schema = UserSchema()
# add this line to make it work for many
users_schema = UserSchema(many=True)

def index():
    users = User.query.all() # sqlalchemy db model
    result = users_schema.dump(users)
    return result


def index2():
    users = User.query.join(tablename, id=tablename2.user_id).filter()