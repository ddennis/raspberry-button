# raspberry-button
simple photobooth raspberry button 

The root pasword is the standard one use for all NextM raspberrys

The process starts up automaticly from a crontab.
@reboot pm2 start /home/pi/raspberry-button/raspberryBtn.js | tee /home/pi/output.txt

It tries to find the photobooth server here: "http://192.168.0.190:3000"

since the process is started as root - "pm2 list" will return nothing. 
you will need to "sudo pm2 list"

To edit the crontab: sudo crontab -e
