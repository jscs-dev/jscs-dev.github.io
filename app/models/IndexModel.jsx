import Collection from './Collection';
import BadgeModel from './BadgeModel';
import UserModel from './UserModel';

export default class IndexModel {
    constructor({introduction, badges, title, users}) {
        this._introduction = introduction;
        this._badges = badges;
        this._title = title;
        this._users = users;
    }

    getIntroduction() {
        return this._introduction;
    }

    getTitle() {
        return this._title
    }

    getBadges() {
        return this._badges;
    }

    getUsers() {
        return this._users
    }

    toJSON() {
        return {
            introduction: this._introduction,
            badges: this._badges,
            title: this._title,
            users: this._users
        };
    }
}

IndexModel.fromJSON = function({introduction, badges, title, users}) {
    return new IndexModel({
        title,
        introduction,
        badges: new Collection(badges.map((badge) => {
            return new BadgeModel(badge);
        })),
        users: new Collection(users.map((user) => {
            return new UserModel(user);
        }))
    });
};
