class UserDatabase {
  #users = null;

  constructor() {
    this.#users = [];
  }

  async addUser(user) {
    if (this.#saveUser(user)) {
      return user;
    } else {
      throw new Error("Failed adding a user");
    }
  }


  #saveUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (!user || typeof user !== "object") {
          reject("provided user is not valid");
        }

        if (!user.id || !user.username) {
          reject("provided user has to contain at least id and username");
        }

        if (this.#users.some((u) => u.id === user.id))
          reject("user with a given id already exists");

        this.#users.push(user);
        resolve("success");
      }, 2000);
    });
  }
}
