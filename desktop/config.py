import getpass
import os
import pickle
from pathlib import Path
import sys
from pc import PCControl


class PCConfig:
    def __init__(self):
        self.usr = getpass.getuser()
        self.current_folder = os.path.dirname(os.path.realpath(__file__))
        self.pathToCopyConfig = str(Path.home())
        self.pathFromCopyConfig = self.current_folder
        self.start = PCControl()

    @staticmethod
    def check_if_config_existed():
        try:
            config = pickle.load(open("nc.nc", "rb"))
            return config
        except FileNotFoundError:
            return False

    @staticmethod
    def create_config(key):
        config = {"key": key}
        try:
            pickle.dump(config, open("nc.nc", "wb"))
            return True
        except Exception as e:
            print(e)
            return False

    def check_config_validity(self, config):
        for k, v in config.items():
            if v.startswith("n"):
                if self.lock_status_config("check_lock"):
                    from lock_the_sky import LOCK_THE_SKY
                    lock = LOCK_THE_SKY()
                    lock.ui(v)
                    # self.lock.ui(config.check_config_validity(config_from_pc))
                self.start.service(v)
            else:
                return "Config Invalid"

    @staticmethod
    def lock_status_config(order_type, lock_status=None):
        if order_type == "locked":
            config = {"locked": lock_status}
            try:
                pickle.dump(config, open("lock.nc", "wb"))
                return True
            except Exception as e:
                return False
        if order_type == "check_lock":
            try:
                for k, v in pickle.load(open("lock.nc", "rb")).items():
                    if k == "locked" and v:
                        return True
            except FileNotFoundError:
                return False

        if order_type == "unlock":
            config = {"locked": False}
            try:
                pickle.load(open("lock.nc", "rb"))
                pickle.dump(config, open("lock.nc", "wb"))
                return True
            except:
                print("Error From hEre")

    @staticmethod
    def get_correct_path(relative_path):
        try:
            base_path = sys._MEIPASS
        except:
            base_path = os.path.abspath(".")

        return os.path.join(base_path, relative_path)
