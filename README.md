# Dribbble

This project uses AJAX to request the most recent images (aka shots) from Dribbble from the categories "Debut", "Team" and "Playoffs" and inserts them into the app webpage under their corresponding category tab.

## Create Dribbble Account

In order for this appplication to run, you must create an account on Dribbble to get a Client Access Token.

Once you've created an account, you need to register this application. To do this:

**STEP 1.** Hover over your avatar icon in the top right corner (next to the search box)

**STEP 2.** Click on "Account Settings"

**STEP 3.** Click on the "Applications" tab on the left sidebar menu

**STEP 4.** Click the button "Register a new application"

**STEP 5.** Fill out the fields and click "Register application". Here is how fields look like:



Once you've completed, you should see at the bottom of your application page your "Client Access Token".

This is the code that you will use to input into the **"config.js"** file in your root directory.

## Create a config.js file

This file must exist for this application to run.

In your root directory, create a file and name is **config.js**

In that file include the following code:

```
var CONFIG = {
	access_token: 'xxxxxxxxxx'
}
```

Make sure you replace the xxxxxxxxxx with your Client Access Token and it must be wrapped in the single quotation marks.

Once you've done that, click save. You're good to go!

## Learn About Dribbble API

If you would like to learn more about how to use the Dribbble API [click here](http://developer.dribbble.com/v1/).

## Sass Watch

In order for the scss changes to reflect on the css file, you must run the sass watch command.

In this case, on the command line go to the root directory. Then type in the following line.

```
sass --watch scss:css
```

## Running App Locally

To run the app locally, simply go to your root directory via your desktop (not command line) and double click on the **index.html** file. This should open a window on your browser displaying the app webpage.