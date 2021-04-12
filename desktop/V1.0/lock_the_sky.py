import os
from datetime import datetime
from tkinter import *
import cv2 as cv
from firebase_admin import storage
from urllib.request import urlopen
from urllib.error import URLError
from API import CAPI
from upload_files import upload_the_sky
import config
import threading


class LOCK_THE_SKY:
    def __init__(self):
        self.connect = CAPI()
        self.key = ""
        self.upload = upload_the_sky()
        self.media = ""
        self.submit_thread = None
        self.root = None
        self.button = None
        self.unlock_button = None
        self.progress = ""

    def ui(self, key):
        self.root = Tk()
        self.key = key
        self.root.overrideredirect(True)
        self.root.geometry("{0}x{1}+0+0".format(self.root.winfo_screenwidth(), self.root.winfo_screenheight()))
        self.root.focus_set()
        self.root.attributes("-topmost", True)
        self.root.protocol("WM_DELETE_WINDOW", self.prevent_close)

        # self.root.bind("<Escape>", lambda e: e.widget.quit())  # delete it

        Label(self.root, text="Locked. eRemote: Type Password You See on Your Phone!!!", fg="red").pack()
        Label(self.root, text="If you lost your phone. Contact us support@eremote.tech").pack()
        e = Entry(self.root)
        e.pack()

        self.button = Button(self.root, text="Check Code",
                             command=lambda: self.start_submit_thread(e.get))

        self.unlock_button = Button(self.root, text="Code Correct! Click Here to exit",
                   command=lambda: self.root.destroy())

        self.button.pack()
        self.root.mainloop()

    def check_submit_thread(self):
        try:
            if self.submit_thread.is_alive():
                self.button.config(state='disabled')
                self.root.after(100, self.check_submit_thread)
            else:
                self.button.config(state='normal')
        except Exception as e:
            print("oh im from check_submit_thread: " + str(e))

    def start_submit_thread(self, code):
        c = code()
        try:
            self.submit_thread = threading.Thread(target=self.unlock_the_sky, args=(c,))
            self.submit_thread.daemon = True
            self.submit_thread.start()
            self.root.after(100, self.check_submit_thread)
        except Exception as e:
            print("oh im from start_submit_thread: " + str(e))

    def arrest_the_bird(self):
        try:
            now = datetime.now()
            timestamp = datetime.timestamp(now)
            camera_port = 0
            camera = cv.VideoCapture(camera_port)
            return_value, image = camera.read()
            filename = "cam_incorrect_pass_" + str(timestamp) + "_" + str(self.key) + ".png"
            cv.imwrite(filename, image)
            self.media = self.upload_to_universe(filename)
            os.remove(filename)
            camera.release()
            cv.destroyAllWindows()
        except Exception as e:
            print(e)

    def unlock_the_sky(self, code):
        if not code:
            self.arrest_the_bird()
            self.connect.send_ransom_lock(self.key, code, media=self.media)
        else:
            if self.connect.send_ransom_lock(self.key, code, media=self.media):
                c = config.PCConfig()
                if c.lock_status_config("unlock"):
                    self.unlock_button.pack()
                    self.button.pack_forget()
            else:
                self.arrest_the_bird()
                self.connect.send_ransom_lock(self.key, code, media=self.media)

    def prevent_close(self):
        pass

    def upload_to_universe(self, filename):
        try:
            urlopen('http://216.58.192.142', timeout=1)
            try:
                self.upload.init_firebase()
                bucket = storage.bucket()
                blob = bucket.blob(filename)
                blob.upload_from_filename(filename)
                blob.make_public()
                return blob.public_url
            except Exception as e:
                print("Oh, " + str(e))
        except URLError as err:
            print("Oh..," + str(err))
