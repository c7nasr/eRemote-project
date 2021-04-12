import tkinter as tk
from tkinter import messagebox
from API import CAPI
from config import PCConfig
import time
from pc import PCControl


class GUI:
    def __init__(self):
        self.start = PCControl()

    def main_screen(self):
        window = tk.Tk()
        instruction = tk.Label(text="Enter Key You See From Phone (With Dashes)")
        instruction.pack()

        key = tk.Entry()
        key.pack()

        example = tk.Label(text="ex: nxxx-xxxx-xxxx")
        example.pack()

        button = tk.Button(text="Confirm", command=lambda: self.get_key(key, window))
        button.pack()

        window.title("eRemote")
        window.resizable(False, False)

        w = window.winfo_reqwidth()
        h = window.winfo_reqheight()
        ws = window.winfo_screenwidth()
        hs = window.winfo_screenheight()
        x = (ws / 2) - (w / 2)
        y = (hs / 2) - (h / 2)
        window.geometry('+%d+%d' % (x, y))
        window.mainloop()

    def get_key(self, e, window):
        connect = CAPI()
        key = e.get()
        config = PCConfig()
        if connect.check_key(key):
            print("Key Correct.!! Connection Established")
            if config.create_config(key):
                print("Config Created")
                messagebox.showinfo("Correct!", "Looks Like The Key You entered is correct. please, "
                                                "Click I entered Code on my PC button on eRemote App."
                                                " then click ok here")
                window.withdraw()
                self.start.service(key)
            else:
                print("Error, Closing....")
        #     Create New Config
        else:
            messagebox.showerror("Oh No!", "Error, Your entered key not correct. Please Double Check It.")
            print("Error, Your entered key not correct. Please Double Check It.")
            print("Closing.....")
            time.sleep(1)
            print("3")
            time.sleep(1)
            print("2")
            time.sleep(1)
            print("1")
            time.sleep(1)
            exit()


