class RandomEmail {

    constructor() {
        this.min = 3;
        this.max = 0;
    }

    setStringLength(max) {
        this.max = max;
        return Math.random() * (this.max - this.min) + this.min;
    }

    setString(length) {
        let string = '';
        for (let i = 0; i < length; i++) {
            var char = Math.random().toString(36).substring(11);
            string = string + char;
        }
        if (string.length > this.max) {
            let diff = string.length - this.max;
            return string.substring(diff);
        }
        return string;
    }

    generate() {
        let usernameLength = this.setStringLength(12);
        let username = this.setString(usernameLength);
        let subdomainLength = this.setStringLength(4);
        let subdomain = this.setString(subdomainLength);

        let newEmail = `${username}@${subdomain}.ru`
        return newEmail;
    }

}

export default RandomEmail;