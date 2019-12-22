import FormEmail from './emails-editor.js';

/**
 * Subscribe on emails list changes
 * @param {function} callback - callback-method
 */
const subscribeEmailChanges = (callback) => {
    FormEmail.defineListener(callback);
};

/**
 * Get emails list
 * @returns {array} - array of string emails
 */
const getEmailsList = () => {
    return FormEmail.emails.map(item => item.value)
};

/**
 * Set new email (single or several)
 * @param {string} email - string with email's value
 */
const setEmail = (email) => {
    FormEmail.generateNewInput(null, email);
};

export { subscribeEmailChanges, getEmailsList, setEmail };