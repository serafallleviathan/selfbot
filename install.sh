#!/usr/bin/bash

pkg update
pkg upgrade
pkg install nodejs -y
pkg install libwebp -y
pkg install mc -y
pkg install ffmpeg -y
pkg install wget -y
pkg install tesseract -y
npm i imgbb-uploader
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install

echo "[*] All dependencies have been installed, please run the command \"npm start\" to immediately start the script"
