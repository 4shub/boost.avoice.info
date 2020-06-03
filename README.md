# We must hold the Minneapolis criminal justice system accountable and demand justice for George Floyd, a Black man murdered in cold blood by four cops in the Minneapolis Police Department.

**Learn more here [https://blacklivesmatters.carrd.co/]()**



# boost.avoice.com

boost.avoice.com is website where you can can quickly create personalized emails to send to people with positions of power as easy way to stand in solidarity with Floyd and the BLM movement.

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

1. Run this code
    ```
    npm dev
    ```

### Emails

Emails can be edited without any programming experience necessary! Follow the instructions below to learn more.

You should have some familiarity with either Github or the `git` commandline tool as you would need to use it to navigate the software

#### Create a new email

1.  Visit or create a new folder in templates. These folders are mapped to the urls of this website. The `minneapolis` folder routes to [http://boost.avoice.info/minneapolis](http://boost.avoice.info/minneapolis);
2.  Add a new `txt` file with your content in the structure below

    ```
    TITLE: title/person we want to contact
    EMAIL: email we want to send to
    SUBJECT_LINE: The subject line of the email
    BODY:
    The text of the email goes here
    ```

3.  You can add the following variables to your email body and subject line as well:
    -   `${firstName}` - The form-filler's first name
    -   `${city}` - The city the form-filler is from
    -   `${region}` - The state (if within the USA) or country the form-filler is from
    -   `${lastName}` - The form-filler's last name (Warning, this is an optional field and will not always be entered in)
4.  When done, you can create a pull request for this repository
