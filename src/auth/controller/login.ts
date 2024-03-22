import { Request, Response } from "express";
import { LoginUser } from "../model/LoginUser";
import logger from "../../common/logger";
import { AuthSerive } from "../service/auth-service";
import { UserService } from "../service/user-service";
import { UserModel } from "../model/User";
import { initSetup } from "../utils/utils";

export const login =async (req: Request, res: Response) => {
    const {userName, password} = req.body
    const loginUser: LoginUser = {
        userName: userName,
        password: password
    }
    console.log(loginUser)
    logger.info("Recieved request for generating token")
    try {
        // await initSetup('admin', '1233', 'true');
        const authService = new AuthSerive()
        const authToken: any =await authService.authenticate(loginUser)
        console.log("In login controller "+authToken)
        return res.json(authToken)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}