//import addStyle from '../assets/addStyles.js';
import RandomEmail from './randomEmail.js';
import Cross from './cross.js';
import { renderNewEmailContainer } from './helpers.js';

const FormEmail = {
    current: this,
    emails: [],
    toListen: [],
    currentEmptyEmail: null,
    regExp: /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,64}/i,
    root: null,
    listener: () => {},
    set email(newValue) {
        this.toListen = newValue,
        this.listener(newValue);
    },
    get email() {
        return this.toListen;
    },
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
        newEmail.addEventListener('keypress', (event) => {
            newEmail.removeEventListener('blur', (event) => FormEmail.handleBlur(event));
            FormEmail.handleKeyPress(event, newEmail)
        });
        newEmail.addEventListener('blur', (event) => FormEmail.handleBlur(event));
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
            FormEmail.emails.push(element);
            FormEmail.email = FormEmail.emails;

            element.parentNode.style.backgroundColor = 'rgba(102, 153, 255, 0.2)';
            element.parentNode.style.borderRadius = '100px';
            element.parentNode.style.padding = '0 10px';
            element.parentNode.style.margin= '0 5px 0 0';
            fakeInput.style.padding = '0 10px 0 0';
        } else {
            fakeInput.style.borderBottom = '1px dashed #d14836';
            element.parentNode.style.margin= '0 20px 0 0';
        }
        //generating X with parent input and correct or incorrect param
        const newCross = new Cross();
        newCross.generate(element, isValid);

        FormEmail.currentEmptyEmail = null;
    },
    handleKeyPress: (event) => {
        if (event.keyCode === 13 || event.keyCode === 44) {
            FormEmail.checkEmailValue(event.target);
        }
    },
    handleBlur: (event) => {
        if (event.target.value.length > 0) {
            //there is a bug: pressing ENTER or COMMA firing both keypress and blur events
            //to avoid it, check if created input has style display:none
            if (event.target.style.display === 'none') return;
            FormEmail.checkEmailValue(event.target)
        };
    },
    generate: (root) => {
        //main form container
        var container = document.createElement('div');
        container.setAttribute('class','formContainer');
    
        //upper container (with header and input's container)
        var upperContainer = document.createElement('div');
        upperContainer.setAttribute('class','upperContainer');
        container.append(upperContainer);
    
        //create header
        var header = document.createElement('div');
        header.setAttribute('class', 'header');
        header.innerHTML = "Share <strong>Board name</strong> with others";
        upperContainer.append(header);
    
        //create input's container
        var inputContainer = document.createElement('div');
        inputContainer.setAttribute('class', 'inputContainer');
        upperContainer.append(inputContainer);
    
        //create class with emails and generate first email input
        FormEmail.generateNewInput(inputContainer);
    
        //create lower container (for the buttons)
        var lowerContainer = document.createElement('div');
        lowerContainer.setAttribute('class','lowerContainer');
        container.append(lowerContainer);
    
        //create Button "Add email"
        var addEmailButton = document.createElement('button');
        addEmailButton.setAttribute('class','addEmailButton');
        addEmailButton.onclick = function() {
            var randEm = new RandomEmail();
            FormEmail.generateNewInput(null, randEm.generate());
        };
        addEmailButton.innerHTML = 'Add email';
        lowerContainer.append(addEmailButton);
    
        //create Button "Get emails count"
        var countEmailButton = document.createElement('button');
        countEmailButton.setAttribute('class','countEmailButton');
        countEmailButton.onclick = function() {
            getEmails(FormEmail.emails);
        };
        countEmailButton.innerHTML = 'Get emails count';
        lowerContainer.append(countEmailButton);
    
        //create CSS styles
        //addStyle(root);
        root.appendChild(container);
    },
    subscribeEmailChanges: () => {
        FormEmail.defineListener(() => {
            console.log(`Someone changed the value of emails to ${FormEmail.emails.map(item => item.value).join(', ')}`);
        });
    },
    getEmailsList: () => {
        return FormEmail.emails.map(item => item.value)
    },
    setEmail: (email) => {
        FormEmail.generateNewInput(null, email);
    }
};

//action for the button "Get emails count"
const getEmails = (emailObject) => {
    let emails = emailObject.map(email => email.value);
    alert(`Valid emails: ${emails.length}`);
}

//creating main HTML-structure of email editor


export default FormEmail;