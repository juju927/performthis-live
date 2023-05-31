from flask import Flask
from routes import users
from extensions import (
    bcrypt,
    db,
    migrate,
)

def create_app(config_object="config"):
  app = Flask(__name__)
  app.config.from_object(config_object)
  bcrypt.init_app(app)
  migrate.init_app(app, db)
  db.init_app(app)
  return app

app = create_app()

app.register_blueprint(users, url_prefix="/users")

from models import User

if __name__ == '__main__':
    app.run(debug=True)

