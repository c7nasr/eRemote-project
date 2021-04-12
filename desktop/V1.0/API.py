import json
import requests
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage


class CAPI:
    def __init__(self):
        self.base_api = "https://ncontrol.herokuapp.com/api/"
        self.headers = {
            'Content-Type': 'application/json'
        }

    def check_key(self, key):
        try:
            data = {
                "key": key
            }
            res = requests.post(self.base_api + "users/status", headers=self.headers, data=json.dumps(data))
            existence = res.json()['status']
            if existence == "ok":
                return True
            else:
                return False
        except Exception as e:
            print("Oh, " + str(e))

    def check_if_matched(self, key):
        try:
            res = requests.get(self.base_api + "users/status?key=" + key)
            status = res.json()['matched']
            return status
        except Exception as e:
            print("Oh, " + str(e))

    def check_for_new_orders(self, key):
        try:

            data = {
                "key": key
            }
            res = requests.post(self.base_api + "control/check", headers=self.headers, data=json.dumps(data))
            status = res.json()['status']
            if status == "ok":
                order = res.json()['order']
                if order is None:
                    return False
                else:
                    return order
        except Exception as e:
            print("Oh, " + str(e))

    def get_notification_token(self, key):
        notifications_token_data = {
            "key": key
        }
        get_notification_token = requests.post(self.base_api + "users/get-notification-token",
                                               headers=self.headers,
                                               data=json.dumps(notifications_token_data))
        notification_token = get_notification_token.json()['token']

        return notification_token

    def mark_order_as_done(self, order, order_id, key, media=None):
        try:
            data = {
                "order": order,
                "id": order_id,
                "key": key,
                "media": media
            }
            res = requests.post(self.base_api + "control/done", headers=self.headers, data=json.dumps(data))
            if res.status_code == 200:
                notification_token = self.get_notification_token(key)
                if order == "INSTANT_SCREEN":
                    self.send_push_message(notification_token, "Screenshot You Requested is ready to download",
                                           "You Received a Response From Your PC", {"page": "Screenshot"})
                elif order == "EAR_ON_THE_SKY":
                    self.send_push_message(notification_token, "Audio Record You Requested is ready for you",
                                           "You Received a Response From Your PC", {"page": "Records"})
                elif order == "EYE_ON_THE_SKY":
                    self.send_push_message(notification_token, "Camera Photo You Requested is ready for you",
                                           "You Received a Response From Your PC", {"page": "Photos"})
                elif order == "INSTANT_LOCK":
                    self.send_push_message(notification_token, "Done, Your PC is Locked Now",
                                           "You Received a Response From Your PC")
                elif order == "SHUTDOWN_THE_SKY":
                    self.send_push_message(notification_token, "We Powered off your PC.We hope to see you again",
                                           "You Received a Response From Your PC")
                elif order == "RESTART_THE_SKY":
                    self.send_push_message(notification_token, "We Restated your PC. Sit and relax!",
                                           "You Received a Response From Your PC")
                elif order == "RANSOM_LOCK":
                    self.send_push_message(notification_token,
                                           "Don't Worry, Now no one can Unlock Your PC. Except YOU!",
                                           "Emergency Locker Has been activated")
                return True
            return False
        except Exception as e:
            print("Oh, " + str(e))

    def send_ransom_lock(self, key, code, media=None):
        try:
            data = {
                "key": key,
                "code": code,
                "media": media

            }
            res = requests.post(self.base_api + "control/lock-the-sky", headers=self.headers, data=json.dumps(data))
            if res.status_code == 200:
                return True
            notification_token = self.get_notification_token(key)
            self.send_push_message(notification_token,
                                   "Don't Worry! We took a Photo for him. Click To see it",
                                   "Someone Tried to unlock Emergency Locker", {"ransom": True})
            return False
        except Exception as e:
            print("Oh, " + str(e))

    def submit_sky_info(self, data):
        try:
            res = requests.post(self.base_api + "users/sky-info", headers=self.headers, data=json.dumps(data))
            if res.status_code == 200:
                return True
            return False
        except Exception as e:
            print("Oh, " + str(e))

    def check_if_ransom_locked(self, key):
        try:
            data = {
                "key": key
            }
            res = requests.post(self.base_api + "control/check-lock-status", headers=self.headers,
                                data=json.dumps(data))
            if res.json()['locked']:
                return True
            return False
        except Exception as e:
            print(e)

    @staticmethod
    def send_push_message(token, message, title, extra=None):
        try:
            response = PushClient().publish(
                PushMessage(to=token,
                            title=title,
                            body=message,
                            data=extra))

        except Exception as exc:
            print(exc)
            # Encountered some Connection or HTTP error - retry a few times in
            # case it is transient.
