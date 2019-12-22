export const renderNewEmailContainer = (newEmail) => {
    let container = document.createElement('span');
    container.setAttribute('class', 'inputCont');
    container.style.position = 'relative';

    newEmail = document.createElement('input');
    newEmail.setAttribute('class', 'emailInput');
    newEmail.setAttribute('type', 'text');
    newEmail.setAttribute('placeholder', 'add more people...');
    
    container.append(newEmail);
    return newEmail;
}