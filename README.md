# Good Citizen Assistant 

The Good Citizen Assistant was created to help people be more engaged and informed citizens. Current features include looking up your elected officials using your address, either through a self-service form or via a chat bot option and looking up recent voting records for current members of Congress. 

## Technologies

JavaScript, React, Redux, Google's Dialogflow, the Propublica Congress API and the Google Civic Information API

## Deployed App 
[goodcitizenassistant.netlify.app](https://goodcitizenassistant.netlify.app/)

## Set Up 
To test this app locally, fork and clone this repo and run npm install followed by npm start. 

### Environment Variables
The application uses Netlify Functions to securely handle external API calls. You'll need to set up the following environment variables for the Netlify Functions:

- `GOOGLE_API` - API key for Google Civic Information API
- `PROPUBLICA_API` - API key for ProPublica Congress API

For local development with Netlify CLI, create a `.env` file in the root directory with these variables.

## Developed By: 
 
[Melissa Pastore](https://www.linkedin.com/in/melissalpastore)
