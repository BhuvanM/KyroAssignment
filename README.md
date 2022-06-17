# TV WebApp

Description:
A webservice that will provide movie recommendations to a user.

Essential Features:
    Your service should provide an endpoint to register a user (Name is mandatory, any other information is your choice)
    Your service should provide an endpoint to get a tv show recommendation. It should accept the userid and provide him with a recommendation that has not been provided to him before.
    Your service should provide an endpoint to reset the user’s recommendation history.
    A simple webpage to interact with the service

Optional features for Extra Credit:
    Recommend shows based on cast, crew, name etc.
    Recommend a show that is streaming on the day the user makes a request
    Accept feedback on the previous recommendations and alter future recommendations
    Anything else you think is a cool feature!

Technical Requirements:
    The submission should be hosted on a publicly accessible domain (netlify, heroku, cloud flare, aws and others provide free options)
    Write simple and easy to understand code.
    The code should have clear instructions to setup and run the webpage and service.
    Please write automated tests cases for your solution
    The code should be available on Github.


Technical installation details:
Hosting:
1. Install postgres with necessary db credentials
2. Config sequelise using the config file to establish connection to the db
3. Configure the proper port for the website to appear
