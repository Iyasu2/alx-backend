#!/usr/bin/env python3
'''
this is a module
'''
from flask import Flask, render_template
from flask_babel import Babel, gettext


app = Flask(__name__)
babel = Babel(app)


@babel.localeselector
def get_locale():
    '''
    use the native language if it's in the list of supported languages
    '''
    return request.accept_languages.best_match(['en', 'fr', 'es', 'de'])


@app.route("/")
def index():
    '''
    this is the index route
    '''
    return render_template("22index.html")


if __name__ == "__main__":
    app.run()
