import firebase_admin
from firebase_admin import credentials
import sys
import os


class upload_the_sky:
    def __init__(self):
        self.project_id = 'ncontrol-8288b'
        self.IS_EXTERNAL_PLATFORM = True
        self.firebase_app = None

    def init_firebase(self):
        if self.firebase_app:
            return self.firebase_app
        if not firebase_admin._apps:
            if self.IS_EXTERNAL_PLATFORM:
                cred = credentials.Certificate(self.get_correct_path('config_firebase.json'))
            else:
                cred = credentials.ApplicationDefault()
            self.firebase_app = firebase_admin.initialize_app(cred, {
                'storageBucket': f"{self.project_id}.appspot.com"
            })

        return self.firebase_app

    @staticmethod
    def get_correct_path(relative_path):
        try:
            base_path = sys._MEIPASS
        except:
            base_path = os.path.abspath(".")

        return os.path.join(base_path, relative_path)
