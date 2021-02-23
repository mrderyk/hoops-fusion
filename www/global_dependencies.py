from www.app import app, api


class GlobalDependencies():
    def __init__(self):
        self._app = None
        self._api = None

    @property
    def app(self):
        if not self._app:
            self._app = app

        return self._app

    @property
    def api(self):
        if not self._api:
            self._api = api

        return self._api


global_dependencies = GlobalDependencies()