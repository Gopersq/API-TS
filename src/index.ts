const BASE_URL = 'https://intership-liga.ru/tasks';

class BasicAgent {
  constructor(private _baseUrl: string) {}

  fetch = async <T>(url: string, config?: RequestInit): Promise<T> | never => {
    const res = await fetch(`${this._baseUrl}${url}`, config);
    if (res.ok) {
      const data = (await res.json()) as T;
      return data;
    } else {
      throw new Error('Ошибка');
    }
  };
}

interface User {
  name: string;
  info: string;
  isImportant: boolean;
}

type UserForUpdate = Partial<User>;

class UsersAgent extends BasicAgent {
  constructor() {
    super(BASE_URL);
  }

  getUser = async (id: number): Promise<User | null> => {
    try {
      const user = await this.fetch<User>(`/${id}`);

      console.log(`ПОЛУЧАЕМ ИНФОРМАЦИЮ О ${id}: ${user}`);

      return user;
    } catch (err) {
      console.log(`ПРИ ПОЛУЧЕНИИ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ${id} ПРОИЗОШЛА ОШИБКА`);

      return null;
    }
  };

  patchUser = async (updateUser: UserForUpdate, id: number): Promise<User | null> => {
    try {
      const updatedUser = await this.fetch<User>(`/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });

      console.log(`ПОЛЬЗОВАТЕЛЬ УСПЕШНО ОБНОВЛЕН ${updatedUser}`);

      return updatedUser;
    } catch (err) {
      console.log(`ПРИ ЧАСТИЧНОМ ОБНОВЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);

      return null;
    }
  };

  deleteUser = async (id: number): Promise<boolean> => {
    try {
      await this.fetch(`/${id}`, {
        method: 'DELETE',
      });

      console.log(`ПОЛЬЗОВАТЕЛЬ ${id} УДАЛЕН`);

      return true;
    } catch (err) {
      console.log(`ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);

      return false;
    }
  };

  getUsers = async (): Promise<User[] | null> => {
    try {
      const users = await this.fetch<User[]>(``);
      console.log(`ПОЛУЧЕНА ИНФОРМАЦИЯ О ВСЕХ ПОЛЬЗОВАТЕЛЯХ ${users}`);

      return users;
    } catch (err) {
      console.log(`ПРИ ПОЛУЧЕНИИ ВСЕХ ДАННЫХ ПРОИЗОШЛА ОШИБКА`);

      return null;
    }
  };

  createUser = async (user: User): Promise<User | null> => {
    try {
      const newUser = await this.fetch<User>(``, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log(`СОЗДАН НОВЫЙ ПОЛЬЗОВАТЕЛЬ ${newUser}`);

      return newUser;
    } catch (err) {
      console.log(`ПРИ СОЗДАНИИ НОВОГО ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);

      return null;
    }
  };
}

const UsersAgentInstance = new UsersAgent();

UsersAgentInstance.getUser(93);

UsersAgentInstance.patchUser(
  {
    name: 'Vadim',
    info: '2222222',
    isImportant: true,
  },
  79
);

UsersAgentInstance.deleteUser(92);

UsersAgentInstance.getUsers();

UsersAgentInstance.createUser({
  name: 'Vadim',
  info: '1111111',
  isImportant: true,
});
