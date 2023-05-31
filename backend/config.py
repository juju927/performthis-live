import os

SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
SECRET_KEY = os.environ.get("SECRET_KEY")
BCRYPT_LOG_ROUNDS = os.environ.get("BCRYPT_LOG_ROUNDS", default=13)
