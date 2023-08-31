export let localServ = {
  setUser: (user) => {
    let dataJson = JSON.stringify(user);
    localStorage.setItem("USER_LOGIN", dataJson);
  },
  getUser: () => {
    let dataJson = localStorage.getItem("USER_LOGIN");
    return JSON.parse(dataJson);
  },
  removeUser: () => {
    localStorage.removeItem("USER_LOGIN");
  },
};
