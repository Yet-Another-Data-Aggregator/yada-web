/**
 * Dashboard component
 * author: Shaun Jorstad
 *
 * route: '/app/channel-templates'
 * purpose: page that will provide access to manage channel templates
 */

import React, { ReactElement, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import DynamicNavbar, { DynamicNavLink } from '../Control/DynamicNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ChannelTemplate } from '../../store/FirestoreInterfaces';
import ChannelTemplateContent from './ChannelTemplateContent';
import { createNewTemplate } from '../../scripts/Datastore';
import Modal from '../Control/Modal';
import Button, { ButtonType } from '../Control/Button';

/**
 * Main container component for channel template pages.
 *
 * @constructor
 */
export default function ChannelTemplates() {
    const templates = useSelector((state: RootState) => state.templates);
    const [newTemplateName, setNewTemplateName] = useState<string>('');
    const [showNewTemplateModal, setShowTemplateModal] = useState(false);

    // Shows the modal for creating new template
    function showModal(): void {
        setShowTemplateModal(true);
    }

    // Hides the modal fro creating new template.
    function hideModal(): void {
        setNewTemplateName('');
        setShowTemplateModal(false);
    }

    // Handles the modal done button.
    function handleModalDone(): void {
        if (newTemplateName) {
            newTemplate();
        }
        hideModal();
    }

    // This function creates a new template
    function newTemplate() {
        createNewTemplate({
            channels: {},
            modified: Date.now().toString(),
            name: newTemplateName,
        });
    }

    // Create links for dynamic navbar
    let navLinks: ReactElement[] = [];
    for (const [id, templateData] of Object.entries(templates)) {
        const data = templateData as ChannelTemplate;
        navLinks.push(
            <DynamicNavLink route={id} key={id} name={data.name}>
                <ChannelTemplateContent template={data} templateId={id} />
            </DynamicNavLink>
        );
    }

    return (
        <Switch>
            <Route path={'/app/channel-templates'}>
                <>
                    <DynamicNavbar title={'Templates'} buttonAction={showModal}>
                        {navLinks as any}
                        <DynamicNavLink
                            route={''}
                            key={'default'}
                            name={'default route'}
                            blockLinkRender={true}
                        >
                            <div className={'message'}>
                                Please select a template
                            </div>
                        </DynamicNavLink>
                    </DynamicNavbar>
                    <Modal show={showNewTemplateModal}>
                        <div className={'content'}>
                            <div className={'inputSection'}>
                                <h2>Template Name:</h2>
                                <input
                                    type={'text'}
                                    name={'templateName'}
                                    id={'templateName'}
                                    onChange={(event) => {
                                        setNewTemplateName(
                                            event.currentTarget.value
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <div className={'modalButtons horizontal'}>
                            <Button
                                type={ButtonType.tableControl}
                                text={'Done'}
                                onClick={handleModalDone}
                            />
                            <Button
                                type={ButtonType.warning}
                                text={'Cancel'}
                                onClick={hideModal}
                            />
                        </div>
                    </Modal>
                </>
            </Route>
        </Switch>
    );
}
