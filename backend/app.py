import os
from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from routes import users
from db import db


def create_app():
  app = Flask(__name__)
  bcrypt = Bcrypt(app)
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
  db.init_app(app)
  return app

app = create_app()

# links app to db to do migrations to db
migrate = Migrate(app, db)
app.register_blueprint(users, url_prefix="/users")

from models import User

if __name__ == '__main__':
    app.run(debug=True)

