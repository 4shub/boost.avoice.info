/* TODO: Fix messiness */
import React from 'react';
import { ALL_US_STATES, COUNTRY_LIST, UNITED_STATES_OF_AMERICA } from '../constants';
import MoreWaysToHelp from './more-ways-to-help/more-ways-to-help';
import { EmailProcessorProps } from './email-processor.types';
import { TemplateDataGroup, TemplateGroup } from '../../template-builder/template.types';
import SendEmailToSelector from './send-email-to-selector/send-email-to-selector';
import PreviewContent from './preview-content/preview-content';

const buildGmailLink = ({ email, body, subject }) =>
    `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${email}&su=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

const buildMailTo = ({ email, body, subject }) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const applyVariablesToString = (str = '', variables) =>
    str.replace(/\${([a-zA-z]+?)}/g, function (v, matchValue) {
        return variables[matchValue];
    });

const applyPreview = (emailTemplates: TemplateDataGroup) => (
    previewType,
    { firstName, lastName, city, state, country }
) => {
    const region = country === UNITED_STATES_OF_AMERICA ? state : country;

    return (
        emailTemplates[previewType] &&
        applyVariablesToString(emailTemplates[previewType].body, {
            firstName: firstName || 'FIRST NAME',
            lastName: lastName && lastName.length > 0 ? ` ${lastName}` : '',
            city: city || 'CITY',
            region: region || 'state',
        })
    );
};
const EmailProcessor = ({ emailTemplates }: EmailProcessorProps) => {
    const emailDataEntries = Object.entries(emailTemplates);

    const [emailInfo, updateState] = React.useState({
        state: 'Alaska',
        country: UNITED_STATES_OF_AMERICA,
        firstName: '',
        lastName: '',
        city: '',
    });

    const { firstName, lastName, city, state, country } = emailInfo;
    const [previewType, onUpdatePreview] = React.useState(null);
    const [step, setNextStep] = React.useState(0);

    const setState = ({ target: { name, value } }) => updateState((state) => ({ ...state, [name]: value }));

    const onChangeRadio = (key) => {
        if (step === 1) {
            setNextStep(2);
        }

        onUpdatePreview(key);
    };

    const subjectLine =
        emailTemplates[previewType] && applyVariablesToString(emailTemplates[previewType].subjectLine, { firstName });
    const body = emailTemplates[previewType] && applyPreview(emailTemplates)(previewType, emailInfo);
    const email = emailTemplates[previewType] && emailTemplates[previewType].email;

    const submitForm = (e) => {
        e.preventDefault();
        if (step === 0) {
            setNextStep(1);
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={submitForm} className="email-form">
                <label>
                    Your First Name
                    <input
                        required
                        className="input-item"
                        name="firstName"
                        value={firstName}
                        placeholder="Your First Name"
                        onChange={setState}
                    />
                </label>
                <label>
                    Your Last Name<em className="optional">(optional)</em>
                    <input
                        className="input-item"
                        name="lastName"
                        value={lastName}
                        placeholder="Your Last Name"
                        onChange={setState}
                    />
                </label>
                <label>
                    Your Country
                    <select required className="input-item" name="country" value={country} onChange={setState}>
                        {COUNTRY_LIST.map((a_country) => (
                            <option key={a_country}>{a_country}</option>
                        ))}
                    </select>
                </label>
                {country === UNITED_STATES_OF_AMERICA && (
                    <label>
                        Your State
                        <select required className="input-item" name="state" value={state} onChange={setState}>
                            {ALL_US_STATES.map((a_state) => (
                                <option key={a_state}>{a_state}</option>
                            ))}
                        </select>
                    </label>
                )}
                <label>
                    Your City
                    <input
                        required
                        className="input-item"
                        name="city"
                        value={city}
                        placeholder="Your City"
                        onChange={setState}
                    />
                </label>
                <button type="submit" className="button">
                    Prep My Email
                </button>
            </form>

            {step >= 1 && (
                <React.Fragment>
                    <div className="email-preview">
                        <h2 id="send-email-to">Send this email to:</h2>
                        <SendEmailToSelector
                            onChange={onChangeRadio}
                            emailList={emailDataEntries}
                            selectedValue={previewType}
                        />
                        <div>
                            {step >= 2 && (
                                <React.Fragment>
                                    <h3>Preview</h3>
                                    <PreviewContent>
                                        <strong>Subject:</strong> {subjectLine}
                                    </PreviewContent>
                                    <PreviewContent>
                                        <strong>To:</strong> {email}
                                    </PreviewContent>
                                    <PreviewContent>{body}</PreviewContent>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </React.Fragment>
            )}
            {step >= 2 && (
                <div className="send-button-container">
                    <div className="button-holder">
                        {body.length <= 6500 && (
                            <a
                                onClick={() => setNextStep(3)}
                                rel="noreferrer"
                                className="button__container"
                                target="_blank"
                                href={buildGmailLink({ body, subject: subjectLine, email })}
                            >
                                <button autoFocus className="gmail-send button">
                                    Open In Gmail
                                </button>
                            </a>
                        )}
                        <a
                            onClick={() => setNextStep(3)}
                            rel="noreferrer"
                            target="_blank"
                            className="button__container"
                            href={buildMailTo({ body, subject: subjectLine, email })}
                        >
                            <button className="button">Open In Default App</button>
                        </a>
                    </div>
                    <em>
                        You’ll still have to press “send” on your email client, but the rest should be done for you.
                    </em>
                </div>
            )}
            {step >= 3 && <MoreWaysToHelp />}
        </React.Fragment>
    );
};

export default EmailProcessor;
