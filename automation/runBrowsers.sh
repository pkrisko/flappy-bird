#!/bin/bash
echo PREREQUISITES
sudo apt-get update
sudo apt-get install -y unzip xvfb libxi6 libgconf-2-4

echo INSTALL GOOGLE CHROME
sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
sudo echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
sudo apt-get -y update
sudo apt-get -y install google-chrome-stable

echo INSTALL CHROMEDRIVER
wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
unzip chromedriver_linux64.zip

echo INSTALL NPM
sudo apt install nodejs npm

echo INSTALL GIT
sudo apt-get install git-core

echo CLONE AND INSTALL THE NECESSARY
git clone https://github.com/pkrisko/flappy-bird.git

echo INSTALL NPM DEPENDENCIES IN AUTOMATION FOLDER
cd flappy-bird/automation
npm install

echo RUN THEM JEWELS FAST
node simulateSeleniumFlappyBird.js




