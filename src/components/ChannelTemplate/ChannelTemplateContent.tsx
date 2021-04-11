import React, { ReactElement } from 'react';
import { ChannelTemplate } from '../../store/FirestoreInterfaces';
import ChannelList from './ChannelList';
import Button, { ButtonType } from '../Control/Button';
import { deleteTemplate } from '../../scripts/Datastore';

interface ChannelTemplateContentProps {
    // The template object to get data from.
    template: ChannelTemplate;

    // The ID of the template
    templateId: string;
}

export default function ChannelTemplateContent({
    templateId,
    template,
}: ChannelTemplateContentProps): ReactElement {
    return (
        <div className={'channelTemplate'}>
            <h1>{template.name}</h1>
            <div className={'deleteButton'}>
                <Button
                    type={ButtonType.warning}
                    text={'Delete Template'}
                    onClick={() => deleteTemplate(templateId)}
                />
            </div>
            <ChannelList template={template} templateId={templateId} />
        </div>
    );
}
