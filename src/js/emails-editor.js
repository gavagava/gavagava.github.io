import EmailLabels from './emailLabels.js';
import addStyle from './addStyles.js';
import RandomEmail from './randomEmail.js';

const FormEmail = {};

//action for the button "Get emails count"
const getEmails = (emailObject) => {
    let emails = emailObject.getAllEmails().map(email => email.value);
    alert(`Valid emails: ${emails.length}`);
}

//creating main HTML-structure of email editor
FormEmail.generate = (root) => {
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
    const newEmail = new EmailLabels();
    newEmail.generateNewInput(inputContainer);

    //create lower container (for the buttons)
    var lowerContainer = document.createElement('div');
    lowerContainer.setAttribute('class','lowerContainer');
    container.append(lowerContainer);

    //create Button "Add email"
    var addEmailButton = document.createElement('button');
    addEmailButton.setAttribute('class','addEmailButton');
    addEmailButton.onclick = function() {
        var randEm = new RandomEmail();
        newEmail.generateNewInput(null, randEm.generate());
        
    };
    addEmailButton.innerHTML = 'Add email';
    lowerContainer.append(addEmailButton);

    //create Button "Get emails count"
    var countEmailButton = document.createElement('button');
    countEmailButton.setAttribute('class','countEmailButton');
    countEmailButton.onclick = function() {
        getEmails(newEmail);
    };
    countEmailButton.innerHTML = 'Get emails count';
    lowerContainer.append(countEmailButton);

    //create CSS styles
    addStyle(root);

    root.appendChild(container);
}
        
export default FormEmail;
        /*shadow.appendChild(style);
        shadow.appendChild(container);*/
    /*}
}*/

//customElements.define('emails-editor', EmailForm);