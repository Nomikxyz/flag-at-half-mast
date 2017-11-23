import os
import datetime
import calendar
import time
f = os.path.getmtime('output.txt')
threshold = f + 86400
with open("output.txt", "r+") as filename:
    if(calendar.timegm(time.gmtime()) > threshold):
         filename.write("sent\n")
	 flag = True
	 print("true")
    elif(calendar.timegm(time.gmtime()) < threshold):
         filename.write("not sent\n")
	 print("false")
