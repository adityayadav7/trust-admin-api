import logger from "../../common/logger";
import { UserDto } from "../../dto/UserDto";
import { Roles } from "../../enums/Roles";
import { ApplicantRepository } from "../../repository/applicantRepository";
import { UserModel } from "../model/User";
import { UserService } from "../service/user-service";
import { JwtTokenUtil } from "./jwt";

export const initSetup= async (adminUsername: string,adminPass: string,runPostConstructScript: string) =>{
    if(Boolean(runPostConstructScript)) {
        try {
            const user = {} as UserDto;
            user.username = adminUsername;
            user.password = adminPass;
            // console.log(user)
            const userService = new UserService(UserModel, adminUsername,adminPass,runPostConstructScript)
            user.role = [Roles.ADMIN.toString()];
            userService.createUser(user);
        }
        catch(e) {
            console.log(e)
            logger.error(e);
        }
    }
}

export const tokenValidation = (token: string, userName: string) => {
    try {
        const jwtUtils = new JwtTokenUtil(172800000,'$dmartCorporate%975*','dmartASL')

        const validToken = jwtUtils.validateToken(token, userName)
        console.log(validToken)
    } catch (error) {
        console.log(error)
    }
}

