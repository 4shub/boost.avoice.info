import React from 'react';

const MoreWaysToHelp = () => (
    <section className="more-ways-to-help">
        <h2>💪 More Ways To Help</h2>
        <div>
            <h3>If you’re on your phone or an Apple computer with a US number:</h3>
            <ul>
                <li>
                    <a href="sms:+55156&body=FLOYD">Text FLOYD to 55156</a>
                </li>
                <li>
                    <a href="sms:+668366&body=JUSTICE">Text JUSTICE to 668366</a>
                </li>
            </ul>
        </div>
        <div>
            <h3>Other ideas:</h3>
            <ul>
                <li>
                    <a href="https://www.gofundme.com/f/georgefloyd">
                        🙏 Donate to the Official George Floyd Memorial Fund
                    </a>
                </li>
                <li>
                    <a href="https://minnesotafreedomfund.org/">
                        💸 Pay protestor’s bail with the Minnesota Freedom Fund
                    </a>
                </li>
                <li>
                    <a href="https://blacklivesmatter.com/">📋 Donate or volunteer with Black Lives Matter</a>
                </li>
                <li>
                    {' '}
                    <a href="https://bailfunds.github.io/">🌎 A list of bail funds by location</a>
                </li>
                <li>
                    {' '}
                    <a href="https://blacklivesmatters.carrd.co/">
                        📖 A great list of petitions, donations, and other resources
                    </a>
                </li>
            </ul>
        </div>
    </section>
);

export default MoreWaysToHelp;
