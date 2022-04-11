var crypto = require('crypto');

// Singleton Class so it is used by various routers
class Authentication {
    static #instance;
    #tokens = {}

    authenticate(user){
        const token = this.generateAuthToken();
        this.#tokens[token] = user;
        return token;
    }

    getAuthenticated(token){
        return this.#tokens[token];
    }

    generateAuthToken(){
        return crypto.randomBytes(30).toString('hex');
    }

    static Instance(){
        return this.#instance = this.#instance || new this();
    }
}

module.exports = Authentication;