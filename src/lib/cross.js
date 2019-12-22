class Cross {
    constructor() {
        this.parentInput = null;
        this.isValid = true;
    }

    deleteEmail() {
        this.parentInput.parentElement.removeChild(this.parentInput);
    }

    generate(element, isValid, callbackDelete) {
        this.parentInput = element.parentElement;
        this.isValid = isValid;

        let crossElement = document.createElement('span');
        //color of X depends of correct input's value
        crossElement.setAttribute('class', isValid ? 'closeValid' : 'closeInvalid' );

        crossElement.addEventListener('click', () => {
            this.deleteEmail();
            callbackDelete(element.value);
        });
        this.parentInput.append(crossElement);
    }
}

export default Cross;