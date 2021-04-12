from config import PCConfig
from gui import GUI
from update_api import UpdateEngine
import ctypes
import webbrowser


class NC:
    def __init__(self):
        if self.check_for_updates() == "No Update":
            self.check_key()
        else:
            ctypes.windll.user32.MessageBoxW(0, "Update Available. Click Ok and Update Link will open."
                                                " Download the update to use the app", "New Update Available!", 0)
            webbrowser.open(self.check_for_updates(), new=0, autoraise=True)
            exit()

    @staticmethod
    def check_key():
        config = PCConfig()
        if not config.check_if_config_existed():
            print("Config Not Found")
            ui = GUI()
            ui.main_screen()
        else:
            config_from_pc = config.check_if_config_existed()
            config.check_config_validity(config_from_pc)

    @staticmethod
    def check_for_updates():
        u = UpdateEngine()
        u2 = u.get_last_version()
        print(u2[0])
        if u2[0] == 1:
            return "No Update"
        else:
            return u2[1]


if __name__ == "__main__":
    app = NC()
