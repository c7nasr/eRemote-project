import requests


class UpdateEngine:
    def __init__(self):
        self.update_checker = "https://paste.in/raw/ZHD13Y"

    def get_last_version(self):
        res = requests.get(self.update_checker)

        return res.json()['client_version'], res.json()['update_link']
