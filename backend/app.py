from flask import Flask
from .routes import auth, users, songs
from .extensions import (
    bcrypt,
    db,
    migrate, 
    cors
)
from .models.User import User

def create_app(config_file="config.py"):
  app = Flask(__name__)
  app.config.from_pyfile(config_file)
  with app.app_context():
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
  return app

app = create_app()

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(songs, url_prefix="/songs")


if __name__ == '__main__':
    app.run(debug=True)

