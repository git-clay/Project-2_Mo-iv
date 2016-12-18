# Project-2_Mo-iv
## project 2 is a full stack app centered around connecting 3rd party apis and a user

Trello: https://trello.com/b/41IPG9C4/project-2-full-stack
Wireframes: https://github.com/git-clay/mapping-wireframes/tree/master/sample-project

The goal for this app was to create an enviroment for users to set goals and have a quantitative value each day for how motivated they are for each goal.  The response to each daily form them fill out would include recommendations based on their results.  I also wanted this app to track each user's values and create a graph to show day to day so they can see paterns in their motivation. 

The start of this application was the general set-up using npm to install the various components I would require during my build.   

### Tools:
    "bcrypt" & "bcrypt-nodejs": Password salt and hash
    "body-parser": To more easily manage json objects
    "connect-flash" : displayed messages from passport
    "cookie-parser" : storing the login info during the session for authentication processes
    "ejs": instead of html I used ejs to have javascript functionality within the html document
    "express" & "express-session" : To more easily communicate with the database
    "mongo" & "mongoose": Used to create and update the database
    "nodemon" : used to automatically reload node after any file was saved
    "passport": used to register and login users
    "request": used to pull in all of these tools on the designated file
    "unirest": What my api required in order to get and post information.


Routes and controllers were created to make the RESTful requests more organized both within the app itself and requests from a third party api.  

The api I used is called "Sentiment Analysis". This is the service that scored each word value based on the perceived positivity or negativity of the word.  Values were placed from -1 to 1 (most negative to most positive).

### Going forward
I plan to make this a viable app by making the UI a little more intuitive.  I plan to fix a few of the bugs that still remain in the questionaire response that relate to the modal and how recommendations will be given based on the results.

Also, I want to get the global user data graph on the main page working as well as the individual graphs for each user.  

I like your recommendation to create a schema for the questions and responses and require that schema in the user schema.  I can definitly see how this will improve this app and probably would have solved some of the issues I ran into while I was initially coding it.
