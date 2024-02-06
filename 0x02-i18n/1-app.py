#!/usr/bin/env python3
'''
this is a module
'''
from flask import Flask, render_template
from flask_babel import Babel, gettext

app = Flask(__name__)
babel = Babel(app)

class config:
    '''this is a class'''
    LANGUAGES = ["en", "fr"]

app.config.from_object(Config)
babel.localeselector(lambda: "en")
babel.timezoneselector(lambda: "UTC")


@app.route("/")
def index():
    '''
    this is the index route
    '''
    title = gettext("Welcome to Holberton")
    header = gettext("Hello world")
    return render_template("1-index.html", title=title, header=header)


if __name__ == "__main__":
    app.run()
