import RandomEmail from './randomEmail.js';
import Cross from './cross.js';

const FormEmail = {
    current: this,
    emails: [],
    toListen: [],
    currentEmptyEmail: null,
    regExp: /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,64}/i,
    root: null,
    listener: () => {},
    //to trigger listener
    set email(newValue) {
        this.toListen = newValue,
        this.listener(newValue);
    },
    get email() {
        return this.toListen;
    },
    //to set callback on emails list changes
    defineListener: (listener) => {
        FormEmail.listener = listener;
    },
    generateNewInput: (root, value) => {
        if (!FormEmail.root) FormEmail.root = root;
    
        let newEmail;
        if (!FormEmail.currentEmptyEmail) {
            newEmail = renderNewEmailContainer(newEmail);
            FormEmail.root.append(newEmail.parentNode);
            FormEmail.currentEmptyEmail = newEmail;
        } else {
            newEmail = FormEmail.currentEmptyEmail;
        }
    
        if (value) {
            newEmail.value = value;
            FormEmail.checkEmailValue(newEmail);
            return;
        }
        newEmail.addEventListener('keypress', (event) => handleKeyPress(event, newEmail));
        newEmail.addEventListener('blur', (event) => handleBlur(event));
    },
    checkEmailValue: (element) => {
        //value can contain space, it should be deleted
        let valueStr = element.value.replace(/\s/g, '');
        //check if value contain several emails
        if (valueStr.indexOf(',') !== -1) {
            let emailsArr = valueStr.split(',');
            //the first value will fill current input
            element.value = emailsArr[0];
            FormEmail.createEmail(element);
            //and the others need new inputs - delete first value
            emailsArr.shift();
            emailsArr.map(email => FormEmail.generateNewInput(FormEmail.root, email));
            return;
        //there is no need to split emails - creating email
        } else {
            element.value = valueStr;
            FormEmail.createEmail(element);
        }
        FormEmail.generateNewInput(FormEmail.root);
    },
    //create single email (correct or not)
    createEmail: (element) => {
        let isValid = FormEmail.regExp.test(element.value) ? true : false;
        let fakeInput = document.createElement('span');
        fakeInput.innerHTML = element.value;

        element.parentNode.appendChild(fakeInput);
        element.style.display = 'none';
        if (isValid) {
            FormEmail.emails.push(element.value);
            //to check if emails list changes
            FormEmail.email = FormEmail.emails;

            element.parentNode.setAttribute('class', 'inputValid');
            fakeInput.setAttribute('class', 'fakeInputValid');
        } else {
            element.parentNode.setAttribute('class', 'inputInvalid');
            fakeInput.setAttribute('class', 'fakeInputInvalid');
        }
        //generating X with parent input and correct or incorrect param
        const newCross = new Cross();
        newCross.generate(element, isValid, callbackDelete);

        FormEmail.currentEmptyEmail = null;
    },
    //set main HTML-structure of email editor
    generate: (root) => {
        //main form container
        let container = document.createElement('div');
        container.setAttribute('class','formContainer');
    
        //upper container (with header and input's container)
        let upperContainer = document.createElement('div');
        upperContainer.setAttribute('class','upperContainer');
        container.append(upperContainer);
    
        //create header
        let header = document.createElement('div');
        header.setAttribute('class', 'header');
        header.innerHTML = "Share <strong>Board name</strong> with others";
        upperContainer.append(header);
    
        //create email input's container
        let inputContainer = document.createElement('div');
        inputContainer.setAttribute('class', 'inputContainer');
        upperContainer.append(inputContainer);
    
        //create class with emails and generate first email input
        FormEmail.generateNewInput(inputContainer);
    
        //create lower container (for the buttons)
        let lowerContainer = document.createElement('div');
        lowerContainer.setAttribute('class','lowerContainer');
        container.append(lowerContainer);
    
        //create Button "Add email"
        let addEmailButton = document.createElement('button');
        addEmailButton.setAttribute('class','clickButton');
        addEmailButton.onclick = () => {
            let randEm = new RandomEmail();
            FormEmail.generateNewInput(null, randEm.generate());
        };
        addEmailButton.innerHTML = 'Add email';
        lowerContainer.append(addEmailButton);
    
        //create Button "Get emails count"
        let countEmailButton = document.createElement('button');
        countEmailButton.setAttribute('class','clickButton');
        countEmailButton.onclick = () => {
            getEmails(FormEmail.emails);
        };
        countEmailButton.innerHTML = 'Get emails count';
        lowerContainer.append(countEmailButton);
    
        root.appendChild(container);
    },
    //set firing callback in setter
    subscribeEmailChanges: (callback) => {
        FormEmail.defineListener(callback);
    },
};

//to delete emails from attribute emails 
const callbackDelete = (value) => {
    let emailToDelete = FormEmail.emails.indexOf(value);
    FormEmail.emails.splice(emailToDelete, 1);
    //to check if emails list changes
    FormEmail.email = FormEmail.emails;
}

const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.keyCode === 44) {
        FormEmail.checkEmailValue(event.target);
    }
};
const handleBlur = (event) => {
    if (event.target.value.length > 0) {
        //there is a bug: pressing ENTER or COMMA firing both keypress and blur events
        //to avoid it, check if created input has style display:none
        if (event.target.style.display === 'none') return;
        FormEmail.checkEmailValue(event.target)
    };
};

//action for the button "Get emails count"
const getEmails = (emailObject) => {
    alert(`Valid emails: ${emailObject.length}`);
}

//set HTML-structure of nex input
const renderNewEmailContainer = (newEmail) => {
    let container = document.createElement('span');
    container.setAttribute('class', 'mainInputContainer');

    newEmail = document.createElement('input');
    newEmail.setAttribute('class', 'mainInput');
    newEmail.setAttribute('type', 'text');
    newEmail.setAttribute('placeholder', 'add more people...');
    
    container.append(newEmail);
    return newEmail;
}

export default FormEmail;