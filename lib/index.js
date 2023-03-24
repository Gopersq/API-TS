"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = 'https://intership-liga.ru/tasks';
class BasicAgent {
    constructor(_baseUrl) {
        this._baseUrl = _baseUrl;
        this.fetch = (url, config) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}${url}`, config);
            if (res.ok) {
                const data = (yield res.json());
                return data;
            }
            else {
                throw new Error('Ошибка');
            }
        });
    }
}
class UsersAgent extends BasicAgent {
    constructor() {
        super(BASE_URL);
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.fetch(`/${id}`);
                console.log(`ПОЛУЧАЕМ ИНФОРМАЦИЮ О ${id}: ${user}`);
                return user;
            }
            catch (err) {
                console.log(`ПРИ ПОЛУЧЕНИИ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ${id} ПРОИЗОШЛА ОШИБКА`);
                return null;
            }
        });
        this.patchUser = (updateUser, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.fetch(`/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(updateUser),
                });
                console.log(`ПОЛЬЗОВАТЕЛЬ УСПЕШНО ОБНОВЛЕН ${updatedUser}`);
                return updatedUser;
            }
            catch (err) {
                console.log(`ПРИ ЧАСТИЧНОМ ОБНОВЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);
                return null;
            }
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fetch(`/${id}`, {
                    method: 'DELETE',
                });
                console.log(`ПОЛЬЗОВАТЕЛЬ ${id} УДАЛЕН`);
                return true;
            }
            catch (err) {
                console.log(`ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);
                return false;
            }
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.fetch(``);
                console.log(`ПОЛУЧЕНА ИНФОРМАЦИЯ О ВСЕХ ПОЛЬЗОВАТЕЛЯХ ${users}`);
                return users;
            }
            catch (err) {
                console.log(`ПРИ ПОЛУЧЕНИИ ВСЕХ ДАННЫХ ПРОИЗОШЛА ОШИБКА`);
                return null;
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.fetch(``, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                console.log(`СОЗДАН НОВЫЙ ПОЛЬЗОВАТЕЛЬ ${newUser}`);
                return newUser;
            }
            catch (err) {
                console.log(`ПРИ СОЗДАНИИ НОВОГО ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);
                return null;
            }
        });
    }
}
const UsersAgentInstance = new UsersAgent();
UsersAgentInstance.getUser(93);
UsersAgentInstance.patchUser({
    name: 'Vadim',
    info: '2222222',
    isImportant: true,
}, 79);
UsersAgentInstance.deleteUser(92);
UsersAgentInstance.getUsers();
UsersAgentInstance.createUser({
    name: 'Vadim',
    info: '1111111',
    isImportant: true,
});
//# sourceMappingURL=index.js.map