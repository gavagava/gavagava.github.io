import FormEmail from './emails-editor.js';

export class EmailsEditor {

    constructor(rootElem) {
        this.root = rootElem;
    }

    /**
     * Initializating new emails editor form
     * @param {HTMLNode} rootContainer - div container with id='emails-editor'
     */
    initEmailsEditor() {
        FormEmail.generate(this.root);
    }

    /**
     * Subscribe on emails list changes
     * @param {function} callback - callback-method
     */
    subscribeEmailChanges(callback) {
        FormEmail.defineListener(callback);
    };

    /**
     * Get emails list
     * @returns {array} - array of string emails
     */
    getEmailsList() {
        return FormEmail.emails.map(item => item.value)
    };

    /**
     * Set new email (single or several)
     * @param {string} email - string with email's value
     */
    setEmail(email) {
        FormEmail.generateNewInput(null, email);
    };
}