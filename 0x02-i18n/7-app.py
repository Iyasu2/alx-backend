#!/usr/bin/env python3
"""A Basic Flask app.
"""
import pytz
from flask_babel import Babel
from flask import Flask, render_template, request, g
from typing import Dict, Union


class Config:
    """Represents a Flask Babel configuration.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    '''
    a function
    '''
    user_id = request.args.get('login_as')
    if user_id is not None:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request():
    '''
    a function
    '''
    g.user = get_user()


@babel.localeselector
def get_locale() -> str:
    '''
    1. Locale from URL parameters
    '''
    if 'locale' in request.args:
        locale = request.args.get('locale')
        if locale in app.config["LANGUAGES"]:
            return locale

    # 2. Locale from user settings
    if g.user is not None:
        user_locale = g.user.get('locale')
        if user_locale in app.config["LANGUAGES"]:
            return user_locale

    # 3. Locale from request header
    return request.accept_languages.best_match(app.config["LANGUAGES"])

    # 4. Default locale is handled by Flask-Babel


@babel.timezoneselector
def get_timezone():
    '''
    if a timezone is passed in the query string, use it if it's valid
    '''
    if 'timezone' in request.args:
        try:
            tz = pytz.timezone(request.args.get('timezone'))
            return tz.zone
        except pytz.exceptions.UnknownTimeZoneError:
            pass

    # if a user is logged in and their timezone is valid, use it
    if g.user is not None:
        try:
            tz = pytz.timezone(g.user.get('timezone'))
            return tz.zone
        except (pytz.exceptions.UnknownTimeZoneError, TypeError):
            pass

    # default to UTC
    return 'UTC'


@app.route('/')
def get_index() -> str:
    """The home/index page.
    """
    return render_template('7-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
