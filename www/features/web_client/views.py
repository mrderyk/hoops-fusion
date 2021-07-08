from flask import render_template
from www.global_dependencies import global_dependencies


app = global_dependencies.app


@app.route('/')
@app.route('/<path:p>')
def render_index(p=None):
    return render_template('index.html')