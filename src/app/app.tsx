import React from 'react';
import { AppProps } from './app.types';

import EmailProcessor from './email-processor/email-processor';
import Footer from './footer/footer';
import Alert from './alert/alert';

import './root.scss';

const App = (props: AppProps) => (
    <div className="center">
        <header>
            <nav className="navigation">
                <ul>
                    <li>
                        <span className="navigation__city navigation__city--selected">{props.currentPath}</span>
                    </li>
                    {props.cities
                        .filter((city) => city !== props.currentPath)
                        .map((city) => {
                            return (
                                <li key={city}>
                                    <a className="navigation__city" href={`/${city}`}>
                                        {city}
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </nav>
            <Alert currentPath={props.currentPath} />
            <h1>✊ #BlackLivesMatter</h1>
        </header>
        <main>
            <section>
                <p>
                    <strong>
                        We must hold the criminal justice system accountable for murders, brutality, and unjust charges
                        against the Black community.
                    </strong>{' '}
                    <br />
                    <br />
                    With this website, you can quickly create personalized emails to send to agencies that can directly
                    impact the outcome of justice proceedings—an easy way to stand in solidarity with the BLM movement.
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
