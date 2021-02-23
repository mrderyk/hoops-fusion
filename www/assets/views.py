from flask import send_from_directory
from www.global_dependencies import global_dependencies
import os

app = global_dependencies.app


@app.route('/static/assets/<asset_filename>')
def serve_asset(asset_filename):
  return send_from_directory('%s/www/static/client/build' % os.getcwd(), asset_filename)