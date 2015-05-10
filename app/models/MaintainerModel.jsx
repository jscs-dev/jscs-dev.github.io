export default class MaintainerModel {
    constructor({name, email, githubUsername, role}) {
        this._name = name;
        this._email = email;
        this._githubUsername = githubUsername;
        this._role = role;
    }

    getName() {
        return this._name;
    }

    getEmail() {
        return this._email;
    }

    getGithubUsername() {
        return this._githubUsername;
    }

    getRole() {
        return this._role;
    }

    getGithubImageLink() {
        return 'https://avatars.githubusercontent.com/' + this.getGithubUsername();
    }

    getGithubLink() {
        return 'https://github.com/' + this.getGithubUsername();
    }

    toJSON() {
        return {
            name: this._name,
            email: this._email,
            githubUsername: this._githubUsername,
            role: this._role
        };
    }
};
