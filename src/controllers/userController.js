export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("Remove");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
