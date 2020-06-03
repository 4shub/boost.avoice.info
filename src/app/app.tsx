import React from 'react';
import { AppProps } from './app.types';

import EmailProcessor from "./email-processor/email-processor";
import Footer from "./footer/footer";
import Alert from "./alert/alert";

import './root.scss';

const App = (props: AppProps) => (
    <div className="center">
        <header>
            <Alert />
            <h1>✊ #BlackLivesMatter</h1>
        </header>
        <main>
            <section>
                <p>
                    <strong>
                        We must hold the Minneapolis criminal justice system accountable and demand justice for George
                        Floyd, a Black man murdered in cold blood by four cops in the Minneapolis Police Department.
                    </strong>{' '}
                    <br />
                    <br />
                    With this website, you can quickly create personalized emails to send to the Minneapolis District
                    Attorney and Minneapolis Police Department—an easy way to stand in solidarity with Floyd and the BLM
                    movement.
                </p>
                <p>
                    None of the information entered here will ever be stored. All processing is done{' '}
                    <a href="https://www.cloudflare.com/learning/serverless/glossary/client-side-vs-server-side/">
                        client-side
                    </a>
                    .
                </p>
            </section>
            <EmailProcessor emailTemplates={props.emailTemplates} />
            <Footer />
        </main>
    </div>
);

export default App;
