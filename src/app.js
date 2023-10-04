import "dotenv/config";
import "regenerator-runtime";
import express from "express";
import cors from "cors";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";

// 비동기 처리방식 사용하기 위한 문법

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

// console.log(process.cwd());
const corsOptions = {
    origin: [
        "https://port-0-project-gps-4fju66f2clmztltc5.sel5.cloudtype.app/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/css", express.static("src/client/css"));
app.use("/file", express.static("src/client/file"));
app.use("/js", express.static("src/client/js"));

app.use("/api", apiRouter);
app.use("/", viewRouter);

app.listen(PORT, () => {
    console.info(`server is runnning at ${PORT} http://localhost:${PORT}`);
});
