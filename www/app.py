
import os

from flask import Flask
from flask_restful import Api
from flask_webpack import Webpack


app = Flask(__name__)
app.config['WEBPACK_MANIFEST_PATH'] = '{dir}/www/static/js/dist/manifest.json'.format(dir=os.getcwd())

api = Api(app)