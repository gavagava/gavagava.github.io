class Cross {
    constructor() {
        this.parentInput = null;
        this.isValid = true;
    }

    deleteEmail(event) {
        this.parentInput.parentElement.removeChild(this.parentInput);
    }

    generate(element, isValid) {
        this.parentInput = element.parentElement;
        this.isValid = isValid;

        let crossElement = document.createElement('span');
        //color of X depends of correct input's value
        crossElement.setAttribute('class', isValid ? 'inputCorrect' : 'inputIncorrect' );

        crossElement.addEventListener('click', (event) => this.deleteEmail(event));
        this.parentInput.append(crossElement);
    }
}

export default Cross;