export const homeViewController = (req, res) => {
    const homeData = {
        data: [{ name: "철수" }, { name: "영희" }, { name: "민수" }],
    };
    res.render("home", homeData);
};

export const introduceViewcontroller = (req, res) => {
    res.render("introduce");
};
export const courseViewcontroller = (req, res) => {
    res.render("course");
};
export const qrViewcontroller = (req, res) => {
    res.render("qr");
};
export const profileViewcontroller = (req, res) => {
    res.render("profile");
};
export const joinViewcontroller = (req, res) => {
    res.render("join");
};
export const loginViewcontroller = (req, res) => {
    res.render("login");
};
