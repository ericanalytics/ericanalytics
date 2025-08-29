// components/faq.js

import React from 'react';
import { Accordion } from 'react-bootstrap';

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <div className="upr_cnt12 max_widt1 text-center text-white">
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Why Choose Eric Analytics as Your Web Analytics Consultant?</Accordion.Header>
                                <Accordion.Body>
                                I specialize in various web analytics tools such as Google Analytics, Tag Manager, and Looker Studio to deliver tailored, data-driven insights. Every setup is customized to your business goals—no generic templates, just accurate tracking and clear reporting that helps you improve performance and drive growth.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Can Eric Analytics provide data analytics services for businesses operating in multiple countries?</Accordion.Header>
                                <Accordion.Body>
                                Yes, Eric Analytics offers comprehensive data analytics services that can be tailored for businesses operating globally. By leveraging tools like Google Analytics, Google Tag Manager, and Looker Studio, I can track and analyze user behavior, website performance, and marketing campaigns across different regions. 
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Can Eric Analytics help with Google Ads optimization?</Accordion.Header>
                                <Accordion.Body>
                                Yes, I specialize in optimizing Google Ads campaigns by analyzing ad performance, identifying high-performing keywords, refining ad copy, and adjusting bids and budgets. This ensures your ads target the right audience, leading to higher click-through rates and conversions.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Can Eric Analytics assist with conversion optimization for websites targeting multiple languages or regions?</Accordion.Header>
                                <Accordion.Body>
                                Definitely. My conversion optimization services include A/B testing and user behavior analysis tailored to different languages and regions. By leveraging data from Google Analytics and Looker Studio, I identify regional preferences and pain points in the user journey, then implement strategies to enhance the user experience and boost conversions for diverse audiences.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Who is Eric Case, and what is his expertise?</Accordion.Header>
                                <Accordion.Body>
                                Eric Case is a dedicated Web Analytics Expert specializing in Google Analytics and Google Ads. With extensive experience in digital marketing analytics, he provides tailored solutions to optimize online performance, refine marketing strategies, and enhance customer engagement, helping businesses achieve their digital goals.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>What is conversion optimization, and how does it benefit my business?</Accordion.Header>
                                <Accordion.Body>
                                Conversion optimization involves using data-driven techniques to turn website visitors into leads or customers. I conduct A/B testing, analyze user behavior, and implement strategies to streamline the conversion funnel, reduce drop-offs, and enhance user experience, ultimately increasing sales and revenue.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>How can I contact Eric Analytics to discuss my analytics needs?</Accordion.Header>
                                <Accordion.Body>
                                {`You can contact Eric Analytics through the website, ericanalytics.net, to schedule a consultation. The "Get In Touch" section provides details for reaching out to discuss how its Web Analytics and Google Analytics services can support your business growth.`}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;