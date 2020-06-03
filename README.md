# We must hold the criminal justice system accountable for brutality, murder, and unjust sentences. This project began as a way to demand justice for George Floyd, a Black man murdered in cold blood by four cops in the Minneapolis Police Department. It has now expanded to support others affected by injustice.

**Learn more here [https://blacklivesmatters.carrd.co/]()**



# boost.avoice.com

boost.avoice.com is website where you can can quickly create personalized emails to send to people with positions of power—an easy way to stand in solidarity with the BLM movement.

## Contributing

### Code

To contribute code you require the following:

-   Node.js version 14.0.0 or later

Follow these steps to setup the code:

1. Clone this repo:

    ```
    git clone https://github.com/4shub/boost.avoice.info.git
    ```

1. Install the dependencies

    ```
    npm i
    ```
   
1. Create dist directory

   ```
   mkdir -p dist
   ```

1. Run this code
    ```
    npm run dev
    ```

### Emails

Emails can be edited with limited programming experience and some familiarity with either GitHub or Git.

#### Create a new email

1.  If the incident occurred in a city that is not yet published, create a new folder in the `templates` folder. Name this folder based on the location of the incident. For example, if the incident happened in the city `gotham` and you named the folder gotham, it would create a new link at http://boost.avoice.info/gotham. Otherwise, skip this step.
2.  Add a new `txt` file to the folder named after the city where the incident occurred. Your content will have to follow the structure below:

    ```
    TITLE: title/person we want to contact
    EMAIL: email we want to send to
    SUBJECT_LINE: The subject line of the email
    BODY:
    The text of the email goes here
    ```

3.  You can add the following variables to your email body and subject line, as well:
    -   `${firstName}` - The form-filler's first name
    -   `${city}` - The city the form-filler is from
    -   `${region}` - The state (if within the USA) or country the form-filler is from
    -   `${lastName}` - The form-filler's last name (Warning, this is an optional field and will not always be entered in)
4.  Once you're done, you can create a pull request for this repository and we'll review it!
