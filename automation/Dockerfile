FROM selenium/standalone-chrome:3.141.59-neon

USER root

# PREREQUISITES
RUN apt-get update

# INSTALL NPM
RUN apt -y install nodejs npm

# INSTALL GIT
RUN apt-get -y install git-core

# CLONE THE REPO
RUN git clone https://github.com/pkrisko/flappy-bird.git

# INSTALL NPM DEPENDENCIES IN AUTOMATION FOLDER
WORKDIR /flappy-bird/automation
RUN npm install

# RUN THE JEWELS FAST
WORKDIR /
RUN node /flappy-bird/automation/simulateSeleniumFlappyBird.js

