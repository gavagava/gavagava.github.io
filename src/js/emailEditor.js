import Cross from './cross.js';

class EmailEditor {

    constructor() {
        this.regExp = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,64}/i;
        //container of inputs
        this.root = null;
        //list of valid emails
        this.emails = [];
        this.currentEmptyEmail = null;
    }

    getAllEmails() {
        return this.emails;
    }

    //create single email (correct or not)
    createEmail(element) {
        let isValid = this.regExp.test(element.value) ? true : false;

        let fakeInput = document.createElement('span');
        fakeInput.innerHTML = element.value;

        element.parentNode.appendChild(fakeInput);
        element.style.display = 'none';
        if (isValid) {
            this.emails.push(element);
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

        this.currentEmptyEmail = null;
    }

    checkEmailValue(element) {
        console.log('checkEmailValue', element.value)
        //value can contain space, it should be deleted
        let valueStr = element.value.replace(/\s/g, '');
        //check if value contain several emails
        if (valueStr.indexOf(',') !== -1) {
            let emailsArr = valueStr.split(',');

            //the first value will fill current input
            element.value = emailsArr[0];
            this.createEmail(element);
            //and the others need new inputs - delete first value
            emailsArr.shift();
            emailsArr.map(email => this.generateNewInput(this.root, email));
            return;
        //there is no need to split emails - creating email
        } else {

            element.value = valueStr;
            this.createEmail(element);
        }
        this.generateNewInput(this.root);
    }

    handleKeyPress(event) {
        if (event.keyCode === 13 || event.keyCode === 44) {
            this.checkEmailValue(event.target);
        }
    }

    handleBlur(event) {
        if (event.target.value.length > 0) {
            //there is a bug: pressing ENTER or COMMA firing both keypress and blur events
            //to avoid it, check if created input has style display:none
            if (event.target.style.display === 'none') return;
            this.checkEmailValue(event.target)
        };
    }

    generateNewInput(root, value) {
        if (!this.root) this.root = root;

        let newEmail;
        if (!this.currentEmptyEmail) {
            let container = document.createElement('span');
            container.setAttribute('class', 'inputCont');
            container.style.position = 'relative';
    
            newEmail = document.createElement('input');
            newEmail.setAttribute('class', 'emailInput');
            newEmail.setAttribute('type', 'text');
            newEmail.setAttribute('placeholder', 'add more people...');
            
            this.currentEmptyEmail = newEmail;

            container.append(newEmail);
            this.root.append(container);
        } else {
            newEmail = this.currentEmptyEmail;
        }

        if (value) {
            newEmail.value = value;
            this.checkEmailValue(newEmail);
            return;
        }
        newEmail.addEventListener('keypress', (event) => {
            newEmail.removeEventListener('blur', (event) => this.handleBlur(event));
            this.handleKeyPress(event, newEmail)
        });
        newEmail.addEventListener('blur', (event) => this.handleBlur(event));
    }
}

export default EmailEditor;