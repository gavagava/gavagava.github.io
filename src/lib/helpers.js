export const renderNewEmailContainer = (newEmail) => {
    let container = document.createElement('span');
    container.setAttribute('class', 'mainInputContainer');

    newEmail = document.createElement('input');
    newEmail.setAttribute('class', 'mainInput');
    newEmail.setAttribute('type', 'text');
    newEmail.setAttribute('placeholder', 'add more people...');
    
    container.append(newEmail);
    return newEmail;
}