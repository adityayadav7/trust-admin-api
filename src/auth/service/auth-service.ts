import { Constants } from "../../common/constants";
import logger from "../../common/logger";
import { LoginUser } from "../model/LoginUser";
import { User, UserModel } from "../model/User";
import { JwtTokenUtil } from "../utils/jwt";
import { UserService } from "./user-service";

export class AuthSerive{
    
    
    async authenticate(loginUser: LoginUser){
        logger.info("Authenticating...")
        const userService = new UserService(UserModel,Constants.USER_NAME, Constants.PASSWORD, Constants.RUN_POST_CONSTRUCT_SCRIPT);
        
        const user: any =  await userService.findByUsername(loginUser.userName)
        console.log("User in authenticate service file "+user)
        const jwtUtils = new JwtTokenUtil(172800000,'$dmartCorporate%975*','dmartASL')
        const token : String = jwtUtils.generateToken(user)
        return {token: token, userName: user.username}
    }

}