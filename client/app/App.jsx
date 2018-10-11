import React from 'react';

export default class App extends React.Component {
    render () {
        return (
            <section>
                <header id="flex-header">
                    <div class="cloud-header"></div>
                    <h1>Congratulations!</h1>
                    <h2>You are currently running a Node.js app built for the IBM Cloud.</h2>
                </header>
                <main>
                    <ul>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://console.bluemix.net/developer/appservice/dashboard?env_id=ibm%3Ayp%3Aus-south">Visit IBM Cloud App Service</a>
                            </div>
                        </li>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://slack-invite-ibm-cloud-tech.mybluemix.net/">Ask questions on Slack</a>
                            </div>
                        </li>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://www.ibm.com/cloud/cli">Install IBM Cloud Developer Tools</a>
                            </div>
                        </li>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://developer.ibm.com/node">Visit Node.js Developer Center</a>
                            </div>
                        </li>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://developer.ibm.com/node/help">Get support for Node.js</a>
                            </div>
                        </li>
                        <li>
                            <div class="right-arrow"></div>
                            <div>
                                <a target="_blank" href="https://developer.ibm.com/node/blogs">Subscribe to our blog</a>
                            </div>
                        </li>
                    </ul>
                </main>
            </section>
        );
    }
}