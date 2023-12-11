  ## Image Editor

I created a image editor app using react and electron, including basic functionalities having few filters and buttons to rotate left and rotate right. I included a save button to download the edited image and a gallery view button to view the saved images in a particular folder.
For the gallery window I created a child window of the parent window. The whole app is made out of trial and error. The gllery window has a next and previous buttons to navigate through the saved pictures. I added a slider to adjust the values of the filters that are being applied. 

First I created a react application using the command **npx create-react-app <name_of_the_application>** and next as I want to work with Electron environment rather than web I removed the web vitals **npm uninstall web-vitals**, deleted the reportWebVitals.js file. Next I instaled CRACO to alter the webpack configuration using the command **npm install @craco/craco** and then created a basic CRACO configuration file. Then installed electron using **npm install electron --save-dev**. After installing created a .js file in the public directory defining the main window and its basic attributes. Few changes are made in the package.jso file in the scripts defining the build and start. After making the app properly work in the electron environment, started making application with the basic features.





To apply changes made in the code: **npm run build**

To run the application: **npm run start**
