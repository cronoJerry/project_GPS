import express from "express";
import {
    courseViewcontroller,
    homeViewController,
    introduceViewcontroller,
    joinViewcontroller,
    loginViewcontroller,
    profileViewcontroller,
    qrViewcontroller,
} from "../controller/viewController";

const viewRouter = express.Router();

viewRouter.get("/login", loginViewcontroller);
viewRouter.get("/join", joinViewcontroller);
viewRouter.get("/profile", profileViewcontroller);
viewRouter.get("/qr", qrViewcontroller);
viewRouter.get("/course", courseViewcontroller);
viewRouter.get("/introduce", introduceViewcontroller);
viewRouter.get("/", homeViewController);

export default viewRouter;
