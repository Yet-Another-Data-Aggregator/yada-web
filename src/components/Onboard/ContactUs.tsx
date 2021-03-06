/**
 * Contact Us page component.
 *
 * This component returns a page containing a form that allows the user to send a message
 * along with an email address to the administrators/owners of the database.
 *
 * Author: Brendan Ortmann
 */
import React, { useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { createEmailDocument } from 'scripts/Datastore';
import { Redirect } from 'react-router-dom';
import CustomButton, { ButtonType } from 'components/Control/Button';

import "assets/styles.scss";
import "assets/bootstrap.scss";
import Modal from 'components/Control/Modal';

export default function ContactUs() {
    let [email, setEmail] = useState('');
    let [message, setMessage] = useState('');
    let [submitted, setSubmitted] = useState(false);
    let [dialog, setDialog] = useState(false);

    /**
     * Handles state changes on the page.
     * @param func function which updates the associated stateful value.
     */
    function handleEvent(func: (event: string) => void) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            func(event.currentTarget.value);
        };
    }

    /**
     * Adds an Email document to the Firestore database.
     * @param event
     */
    const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createEmailDocument(email, message, 'YADA Contact Us');
        setDialog(true);
    };

    /**
     * Sets the "submitted" stateful value which redirects the user to the onboard
     * screen on form submission.
     * @returns a function that sets "submitted" to true
     */
    const toOnboard = () => setSubmitted(true);

    /**
     * Redirects to the Sign In page if the form has been submitted, otherwise serves the page again.
     */
    return submitted ? (
        <Redirect push to="/" />
    ) : (
        <div className="contactUs h-screen">
            <Modal 
                show={dialog}
                onClickOutside={toOnboard}
                children={[
                    <div className="content">
                        <h2>Email sent!</h2>
                        <p>Administrators will receive your message shortly.</p>
                    </div>,
                    <div className="modalButtons horizontal">
                        <CustomButton
                            text='Return to Sign In'
                            type={ButtonType.tableControl}
                            onClick={toOnboard}
                        />
                    </div>
                ]}
            />
            <div className="card">
                <h1>Contact Us</h1>
                <Form onSubmit={sendEmail} className="py-8">
                    <Input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEvent(setEmail)}
                    />
                    <Input
                        required
                        type="textarea"
                        name="textarea"
                        id="textarea"
                        rows="4"
                        placeholder="Message"
                        value={message}
                        onChange={handleEvent(setMessage)}
                    />
                    <Button type="submit" value="Submit">
                        Contact Us
                    </Button>
                </Form>
            </div>
        </div>
    );
}
