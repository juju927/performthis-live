import os
from flask import Flask
# from flask_migrate import Migrate
# from flask_bcrypt import Bcrypt
from routes import users
# from db import db

from extensions import (
    bcrypt,
    db,
    migrate,
)

def create_app(config_object="config"):
  app = Flask(__name__)
  app.config.from_object(config_object)
  # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
  bcrypt.init_app(app)
  migrate.init_app(app, db)
  db.init_app(app)
  return app

app = create_app()

# links app to db to do migrations to db
# migrate = Migrate(app, db)
app.register_blueprint(users, url_prefix="/users")

from models import User

if __name__ == '__main__':
    app.run(debug=True)

