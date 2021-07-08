import os

from www.global_dependencies import global_dependencies
from www import view_setup, api_setup

app = global_dependencies.app

if __name__ == '__main__':
    app.run(host='0.0.0.0')