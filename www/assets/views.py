from flask import send_from_directory
from www.global_dependencies import global_dependencies
import os

app = global_dependencies.app


@app.route('/static/assets/bundle.js')
def serve_js_bundle():
  return send_from_directory('{base_dir}/www/static/client/build'.format(base_dir=os.getcwd()), 'bundle.js')

@app.route('/static/assets/css/<filename>')
def serve_css_asset(filename):
  return send_from_directory('{base_dir}/www/static/css'.format(base_dir=os.getcwd()), filename)

@app.route('/static/assets/img/<filename>')
def serve_img_asset(filename):
  return send_from_directory('{base_dir}/www/static/img'.format(base_dir=os.getcwd()), filename)

@app.route('/static/assets/images/<filename>')
def serve_etc_asset(filename):
  return send_from_directory('{base_dir}/www/static/client/build/images'.format(base_dir=os.getcwd()), filename)