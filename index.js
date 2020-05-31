const ALL_US_STATES = ["Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    " North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"]

const EMAIL_DATA = {
    district_attorney: {
        title: "Minneapolis District Attorney",
        to_person: "Mr. Mike Freeman",
        email: "citizeninfo@hennepin.us",
            body: ({ firstName, lastName, city, state }) => `To Whom It May Concern:
        
My name is ${firstName}${lastName}. I live ${city}, ${state}, but I am appalled enough about recent events in Minneapolis to take the time to write in.

I am demanding justice for George Floyd, a Black man who was murdered in cold blood by four Minneapolis Police Department offices on May 25, 2020. This incident was caught on video by multiple sources, including but not limited to the one linked, all of which clearly prove the guilt of the officers in question.

Officer Derek Chauvin (badge #1087) is guilty of murder. The three other officers, including Tou Thao (badge #1087) are accomplices to this vile hate crime.

Firing the officers involved is not enough, and giving these officers paid leave is beyond inappropriate. Justice for George Floyd will not be served until these officers are taken to court and charged appropriately for their crimes.

Sincerely,
${firstName}${lastName}`
    },

    police_department_1: {
        title: "Minneapolis Police Department",
        to_person: "Whom It May Concern",
        email: "police@minneapolismn.gov",
        body: ({ firstName, lastName, city, state }) => `To Whom It May Concern:
    
My name is ${firstName}${lastName}. I live ${city}, ${state}, but I am appalled enough about recent events involving the Minneapolis Police Department to write in.

I am demanding justice for George Floyd, a Black man who was murdered in cold blood by four of your offices on May 25, 2020. This incident was caught on video by multiple sources, all of which clearly prove the guilt of the officers in question.

Officer Derek Chauvin (badge #1087) is guilty of murder. The three other officers, including Tou Thao (badge #1087) are accomplices to this vile hate crime.

Firing the officers involved is not enough, and giving these officers paid leave is beyond inappropriate. Justice for George Floyd will not be served until these officers are taken to court and charged appropriately for their crimes.

Sincerely,
${firstName}${lastName}`
    },

    police_department_2: {
        title: "Minneapolis 311",
        to_person: "Whom It May Concern",
        email: "minneapolis311@minneapolismn.gov",
        body: ({ firstName, lastName, city, state }) => `To Whom It May Concern:
    
My name is ${firstName}${lastName}. I live ${city}, ${state}, but I am appalled enough about recent events involving the Minneapolis Police Department to write in.

I am demanding justice for George Floyd, a Black man who was murdered in cold blood by four of your offices on May 25, 2020. This incident was caught on video by multiple sources, all of which clearly prove the guilt of the officers in question.

Officer Derek Chauvin (badge #1087) is guilty of murder. The three other officers, including Tou Thao (badge #1087) are accomplices to this vile hate crime.

Firing the officers involved is not enough, and giving these officers paid leave is beyond inappropriate. Justice for George Floyd will not be served until these officers are taken to court and charged appropriately for their crimes.

Sincerely,
${firstName}${lastName}`
    },

    police_department_3: {
        title: "Minneapolis Police Review",
        to_person: "Whom It May Concern",
        email: "policereview@minneapolismn.gov",
        body: ({ firstName, lastName, city, state }) =>  `To Whom It May Concern:

My name is ${firstName}${lastName}. I live ${city}, ${state}, but I am appalled enough about recent events involving the Minneapolis Police Department to write in.

I am demanding justice for George Floyd, a Black man who was murdered in cold blood by four of your offices on May 25, 2020. This incident was caught on video by multiple sources, all of which clearly prove the guilt of the officers in question.

Officer Derek Chauvin (badge #1087) is guilty of murder. The three other officers, including Tou Thao (badge #1087) are accomplices to this vile hate crime.

Firing the officers involved is not enough, and giving these officers paid leave is beyond inappropriate. Justice for George Floyd will not be served until these officers are taken to court and charged appropriately for their crimes.

Sincerely,
${firstName}${lastName}`
    },
}


const buildGmailLink = ({ email, body, subject }) => `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

const buildMailTo = ({ email, body, subject }) => `mailto:${email}.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

const emailDataEntries = Object.entries(EMAIL_DATA);

const applyPreview = (previewType, { firstName, lastName, city, state }) => {


    return EMAIL_DATA[previewType] && EMAIL_DATA[previewType].body({
        firstName: firstName || 'FIRST NAME', lastName: lastName ? ` ${lastName}` : '', city: city || 'CITY', state: state || 'state'
    });
}

const EmailData = () => {
    const [emailInfo , updateState] = React.useState({ state: 'Alaska'  });
    const { firstName, lastName, city, state } = emailInfo;
    const [previewType, onUpdatePreview] = React.useState(null);
    const [step, setNextStep] = React.useState(0);

    const setState = ({ target: { name, value }}) => updateState((state) => ({...state, [name]: value }));

    const onChangeRadio = (key) => {
        if (step === 1) {
            setNextStep(2);
        }

        onUpdatePreview(key);
    }

    const subjectLine = `I, ${firstName || 'FIRST NAME'}, demand justice for George Floyd`;
    const body = applyPreview(previewType, emailInfo);
    const email = EMAIL_DATA[previewType] && EMAIL_DATA[previewType].email;

    const submitForm = (e) => {
        e.preventDefault();
        if (step === 0) {
            setNextStep(1);
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={submitForm} className="email-form">
                <label>
                    Your First Name
                    <input required className="input-item" name="firstName" value={firstName} placeholder="Your First Name" onChange={setState} />
                </label>
                <label>
                    Your Last Name<em className="optional">(optional)</em>
                    <input className="input-item" name="lastName" value={lastName} placeholder="Your Last Name" onChange={setState} />
                </label>
                <label>
                    Your City
                    <input required className="input-item" name="city" value={city} placeholder="Your City" onChange={setState} />
                </label>
                <label>
                    Your State
                    <select required className="input-item" name="state"  value={state} onChange={setState}>
                        {ALL_US_STATES.map(a_state => <option key={a_state}>{a_state}</option>)}
                    </select>
                </label>
                <button type="submit" className="button">
                    Prep My Email
                </button>
            </form>

            {step >= 1 && (
                <React.Fragment>
                    <div className="email-preview">
                        <h2>Send this email to:</h2>
                        <div className="preview-for">
                            {emailDataEntries.map(([key, { title }], index ) => (
                                <label className="radio-inline">
                                    <input key={key} onChange={() => onChangeRadio(key)} type="radio" name="optradio" checked={previewType === key} value={key} />{title}
                                </label>
                            ))}
                        </div>
                        <div>
                            {step >= 2 && (
                                <React.Fragment>
                                    <h3>Preview</h3>
                                    <div className="email-preview__body">
                                        <strong>Subject:</strong> {subjectLine}<br />
                                        <strong>To:</strong> {email}<br /><br />
                                        {body}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>


                </React.Fragment>
            )}
            {step >= 2 && (
                <div className="send-button-container">
                    <div className="button-holder">
                        <a onClick={() => setNextStep(3)} rel="noreferrer" target="_blank" href={buildGmailLink({ body, subject: subjectLine, email  })}>
                            <button className="gmail-send button">
                                Open In Gmail
                            </button>
                        </a>
                        <a onClick={() => setNextStep(3)} rel="noreferrer" target="_blank" href={buildMailTo({ body, subject: subjectLine, email  })}>
                            <button className="button">
                                Open In Default App
                            </button>
                        </a>
                    </div>
                    <em>You’ll still have to press “send” on your email client, but the rest should be done for you.</em>
                </div>
            )}
            { step >= 3 && (
                <MoreWaysToHelp />
            )}

        </React.Fragment>
    )
}

const MoreWaysToHelp = () => (
    <section className="more-ways-to-help">
        <h2>💪 More Ways To Help</h2>
        <div>
            <h3>If you’re on your phone or an Apple computer with a US number:</h3>
            <ul>
                <li><a href="sms:+55156&body=FLOYD">Text FLOYD to 5516</a></li>
                <li><a href="sms:+668366&body=JUSTICE">Text JUSTICE to 668366</a></li>
            </ul>
        </div>
        <div>
            <h3>Other ideas:</h3>
            <ul>
                <li><a href="https://www.gofundme.com/f/georgefloyd">🙏 Donate to the Official George Floyd Memorial Fund</a></li>
                <li><a href="https://minnesotafreedomfund.org/">💸 Pay protestor’s bail with the Minnesota Freedom Fund</a></li>
                <li><a href="https://blacklivesmatter.com/">📋 Donate or volunteer with Black Lives Matter</a></li>
                <li> <a href="https://bailfunds.github.io/">🌎 A list of bail funds by location</a></li>
                <li> <a href="https://blacklivesmatters.carrd.co/">📖 A great list of petitions, donations, and other resources</a></li>
            </ul>
        </div>
    </section>
)

const Footer = () => (
    <section className="footer">
        We made this website to amplify the voices of the BLM movement, and we plan to add more functionalities in the near future. If you have any feature suggestions or resources to share, please DM <a rel="noreferrer" target="_blank" href="https://twitter.com/oddrilynn">@oddrilynn</a> or <a rel="noreferrer" target="_blank" href="https://twitter.com/4shub">@4shub</a> on Twitter.
    </section>
)

const App = () => (
    <div className="center">
        <header>
            <h1>✊ #BlackLivesMatter</h1>
        </header>
        <main>
            <section>
                <p><strong>We must hold the Minneapolis criminal justice system accountable and demand justice for George Floyd, a Black man murdered in cold blood by four cops in the Minneapolis Police Department.</strong> <br /><br />With this website, you can quickly create personalized emails to send to the Minneapolis District Attorney and Minneapolis Police Department—an easy way to stand in solidarity with Floyd and the BLM movement.</p>
                <p>
                    None of the information entered here will ever be stored. All processing is done <a href="https://www.cloudflare.com/learning/serverless/glossary/client-side-vs-server-side/">client-side</a>.
                </p>
            </section>
            <EmailData />
            <Footer />

        </main>
    </div>
)

ReactDOM.render(<App />, document.getElementById('app'));