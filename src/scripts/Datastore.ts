/**
 * This script contains every datastore query used by the application. These functions will need to be modified when the system is implemented to work with whatever database is being used. The specific function requirements are documented. Any changes to these function arguments and return types will require additional changes in the source code.
 */

// ------------------------------------------------
// ONLY EDIT THIS LINE
import * as implementation from './Implementation';
// ------------------------------------------------

import updateChannelTemplatesSlice from 'store/ChannelTemplateActions';
import store from 'store/store';
import updateUsersSlice from 'store/UserAction';
import loggerSlice from 'store/LoggerAction';
import sitesSlice from 'store/SiteActions';

// AUTHENTICATION
/**
 * Registers the handler which updates the redux store when the authenticated user changes.
 *
 * the authObject can be any object that contains a 'uid' key conatining the user ID
 * @param callback the callback function that executes anytime the authenticated user changes. This function modifies the redux store to update the ui
 */
export function registerAuthChangeCallback(callback: (userAuth: any) => void) {
    implementation.handleAuthStateChange(callback);
}

/**
 * Requires that the user have the appropriate privileges. If true, this resolves with 'true'. if false, this rejects with 'false'
 * @param requiredPrivilege the privilege required to execute a function
 * @returns promise resolving with true if the user has the correct privileges
 */
function requirePrivilegeLevel(requiredPrivilege: string): Promise<Boolean> {
    // casts privilege string to a number
    const castPrivilegeToNumber = (privilege: string) => {
        switch (privilege) {
            case 'Owner':
                return 3;
            case 'Admin':
                return 2;
            case 'Power':
                return 1;
            case 'User':
                return 0;
            default:
                return -1;
        }
    };
    return new Promise((resolve, reject) => {
        return getUserPrivilege().then((privilege: string) => {
            if (
                castPrivilegeToNumber(privilege) >=
                castPrivilegeToNumber(requiredPrivilege)
            ) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}

/**
 * Fetches the privilege of the currently authenticated user.
 * Returns a promise that resolves with one of: ['Owner', 'Admin', 'Power', 'User']
 */
export function getUserPrivilege(): Promise<any> {
    return implementation.getUserPrivilege();
}

/**
 * initializes every datastore listener to sync datastore updates to the redux store
 */
export function initializeListeners() {
    implementation.initializeChannelTemplatesListener();
    implementation.initializeSitesListener();
    implementation.initializeUsersListener();
    implementation.initializeLoggersListener();
}

/**
 * clears the redux store
 */
export function resetRedux() {
    store.dispatch(updateUsersSlice.actions.updateUsers({}));
    store.dispatch(loggerSlice.actions.updateLoggers({}));
    store.dispatch(sitesSlice.actions.updateSites({}));
    store.dispatch(
        updateChannelTemplatesSlice.actions.updateChannelTemplates({})
    );
}

/**
 * creates a new site in the datastore
 */
export function createNewSite() {
    requirePrivilegeLevel('Power').then(implementation.createNewSite, () => {
        console.log('Innapropriate permissions to create a site');
    });
}

/**
 * creates new equipment
 * @param siteUID string
 * @param equipmentName string
 */
export function createNewEquipment(siteUID: string, equipmentName: string) {
    requirePrivilegeLevel('Power').then(
        () => {
            implementation.createNewEquipment(siteUID, equipmentName);
        },
        () => {
            console.log('Innapropriate permissions to create new equipment');
        }
    );
}

/**
 * sends authorization email to newly registered email
 * @param address
 */
export function sendAuthorizationEmail(address: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.sendAuthorizationEmail(address);
        },
        () => {
            console.log(
                'Innapropriate permissions to send authorization email'
            );
        }
    );
}

/**
 * Creates an email document which will be later sent to admins and then deleted
 * @param email string
 * @param message string
 * @param subject string
 */
export function createEmailDocument(
    email: string,
    message: string,
    subject: string
) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.createEmailDocument(email, message, subject);
        },
        () => {
            console.log('Innapropriate permissions to create email document');
        }
    );
}

/**
 * creates the user document to store info on the newly registered user
 * @param uid string
 * @param email string
 * @param userGroup string
 */
export function createUserDocument(
    uid: string,
    email: string,
    userGroup: string
) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.createUserDocument(uid, email, userGroup);
        },
        () => {
            console.log('Innapropriate permissions to create user document');
        }
    );
}

/**
 * attemps to sign in the user
 * @param email string
 * @param password string
 *
 * returns a promise that resolves with the successfully signed in user document
 */
export function signInWithEmail(email: string, password: string): Promise<any> {
    return implementation.signInWithEmail(email, password);
}

/**
 * signs out the current user
 * returns a promise that resolves without arguments
 */
export function fireAuthSignOut(): Promise<any> {
    return implementation.fireAuthSignOut();
}

/**
 * Fetches the User document specified
 * @param uid string
 *
 * returns a promise that resolves with the user document
 */
export function getUserData(uid: string): Promise<any> {
    return implementation.getUserData(uid);
}

/**
 * Changes the password for the logged in user
 * @param newPassword string
 *
 * returns a promise that resolves with nothing
 */
export function changePassword(newPassword: string): Promise<any> | undefined {
    return implementation.changePassword(newPassword);
}

/**
 * sends password reset email
 * @param email
 */
export function sendPasswordResetEmail(email: string) {
    return implementation.sendPasswordResetEmail(email);
}

/**
 * edits user email
 * @param userID string
 * @param email string
 */
export function editEmail(userID: string, email: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.editEmail(userID, email);
        },
        () => {
            console.log(
                'Innapropriate permissions to edit another users email'
            );
        }
    );
}

/**
 * edits user phone number
 * @param userID string
 * @param number string
 */
export function editPhoneNumber(userID: string, number: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.editPhoneNumber(userID, number);
        },
        () => {
            console.log(
                'Innapropriate permissions to edit another users phone number'
            );
        }
    );
}

/**
 * edits user privilege level
 * @param userID string
 * @param privilege string: one of ['Admin', 'Power', 'User']
 */
export function editPrivilege(userID: string, privilege: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.editPrivilege(userID, privilege);
        },
        () => {
            console.log(
                'Innapropriate permissions to edit another users privilege level'
            );
        }
    );
}

/**
 * deletes a user
 * @param userID string
 */
export function deleteUser(userID: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.deleteUser(userID);
        },
        () => {
            console.log('Innapropriate permissions to delete a user');
        }
    );
}

/**
 * registers a user
 * @param email string
 */
export function registerUser(email: string) {
    requirePrivilegeLevel('Admin').then(
        () => {
            implementation.registerUser(email);
        },
        () => {
            console.log('Innapropriate permissions to register a user');
        }
    );
}
/**
 * updates the user document with the following settings
 * @param uid
 * @param newVals
 */
export function updateUserDoc(uid: string, newVals: any) {
    implementation.updateUserDoc(uid, newVals);
}

export function deleteEquipment(siteID: string, name: string) {
    requirePrivilegeLevel('Power').then(
        () => {
            implementation.deleteEquipment(siteID, name);
        },
        () => {
            console.log('Innapropriate permissions to delete equipment');
        }
    );
}

export function changeEquipmentName(
    siteID: string,
    oldName: string,
    newName: string
) {
    requirePrivilegeLevel('Power').then(
        () => {
            implementation.changeEquipmentName(siteID, oldName, newName);
        },
        () => {
            console.log(
                'Innapropriate permissions to update the equipment name'
            );
        }
    );
}
export function updateSiteConfig(siteId: string, siteConfig: any) {
    requirePrivilegeLevel('Power').then(
        () => {
            implementation.updateSiteConfig(siteId, siteConfig);
        },
        () => {
            console.log(
                'Innapropriate permissions to update the site configuration'
            );
        }
    );
}

/**
 * Updates the equipment notifications map in the user document specified by @param uid.
 * @param uid
 * @param siteId
 * @param notificationMap
 */
export function updateEquipmentNotifications(
    uid: string,
    siteId: string,
    notificationMap: any
) {
    implementation.updateEquipmentNotifications(uid, siteId, notificationMap);
}

export function updateEquipmentNotification(
    uid: string,
    siteId: string,
    equipmentName: string,
    status: Boolean
) {
    implementation.updateEquipmentNotification(
        uid,
        siteId,
        equipmentName,
        status
    );
}

export function deleteSite(siteId: string) {
    requirePrivilegeLevel('Power').then(
        () => {
            implementation.deleteSite(siteId);
        },
        () => {
            console.log('Innapropriate permissions to delete the site');
        }
    );
}
