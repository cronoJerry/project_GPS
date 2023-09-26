import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

// project 위치 확인
// console.log(process.cwd());

app.use((req, res, next) => {
    console.log("pass this message");
    next();
});

app.get("/", (req, res) => {
    const homeData = {
        data: [{ name: "철수" }, { name: "영희" }, { name: "민수" }],
    };
    res.render("home", homeData);
});

app.get("/abc", (req, res) => {
    res.send("abc page");
});

app.get("/introduce", (req, res) => {
    res.render("introduce");
});

app.listen(8080, () => {
    console.info("server is runnning at 8080 http://localhost:8080");
});
