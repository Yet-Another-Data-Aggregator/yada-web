export interface Script {
    name: string;
    fullPath: string;
}

export interface SiteCollection {
    [key: string]: SiteObject;
}

export interface SiteObject {
    address: string;
    equipmentUnits: EquipmentUnit[];
    name: string;
    notes: string;
    lastViewedFaults?: Number;
}

export interface EquipmentUnit {
    faults: Fault[];
    loggers: string[];
    name: string;
    health: string;
    type: string;
}

export interface LoggerCollection {
    [key: string]: LoggerObject;
}

export interface LoggerObject {
    channelTemplate: string;
    collectingData: boolean;
    data: any[];
    faults: Fault[];
    equipment: string;
    ip: string;
    mac: string;
    notes: string;
    site: string;
    status: boolean;
    uptime: any;
    name: string;
}

export interface Fault {
    timestamp: number;
    messages: string[];
}

export interface ChannelTemplate {
    channels: { [key: string]: Channel };
    modified: string;
    name: string;
}

export interface Channel {
    name: string;
    script: string;
    keys: ChannelKeys;
}

export interface ChannelKeys {
    [key: string]: string;
}

export interface ChannelTemplateCollection {
    [key: string]: ChannelTemplate;
}

export interface UserCollection {
    [key: string]: User;
}

export interface User {
    defaults: boolean;
    email: string;
    disabled: boolean;
    phoneNumber: string | null;
    userGroup: string;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    equipmentNotifications?: {
        [siteId: string]: {
            [equipmentName: string]: boolean;
        };
    };
}
