import os

from www.global_dependencies import global_dependencies
from www import view_setup, api_setup


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))
    global_dependencies.app.run(host='0.0.0.0', port=port)