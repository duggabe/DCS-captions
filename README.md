# DCS-captions
Creates live captions from audio input

## Installation
**IMPORTANT NOTES:**

* These instructions are written for a Linux OS. Similar commands work for Mac and Windows.
* Use the `clone` command rather than downloading a Zip file!
* This package works ONLY with a Google Chrome browser.

* Open a terminal window.  
* Change to the home directory.
  
```
cd ~/  
```
* If you don't have 'git', enter.

```
sudo apt install git  
```
* Clone the repository:

```
git clone https://github.com/duggabe/DCS-captions.git
```
* Change to the cloned directory:

```
cd ~/DCS-captions
```
* If you don't have 'node' (or 'nodejs') enter:

```
sudo apt install nodejs
```
* If you don't have 'npm' enter:

```
sudo apt install npm
```
* There are three files to define the Operating System for DCS-captions. Execute the appropriate one for your system.

```
cp -v opSys_Linux.txt opSys.txt
cp -v opSys_Mac.txt opSys.txt
copy opSys_Win.txt opSys.txt
```

## Operation

* To start DCS-captions, enter:<br>
  `node index.js` <- OR -> `npm start`<br>
  Note: using npm is slower to start, but it sets up some error logging of its own which can be useful in debugging problems.
* You will get the following messages on your terminal:
    - "opSys is Linux" (your appropriate OS)
    - "DCS-captions has started. Listening on port: 50200"
* A web page (or tab) will open in your default browser. Make sure it is Google Chrome or open Chrome and go to URL `http://localhost:50200/DCS-captions.html`.
* Click on "Start captioning"
* Your system will ask for access to your microphone.
* To terminate the program, enter Control-C and also close the browser tab.

