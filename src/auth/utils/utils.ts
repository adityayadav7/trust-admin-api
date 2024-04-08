import { Response } from "express";
import { Constants } from "../../common/constants";
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

export const tokenValidation = (token: string, userName: any) => {
    try {
        const jwtUtils = new JwtTokenUtil(Constants.TOKEN_VALIDITY,Constants.TOKEN_SIGNING_KEY,Constants.TOKEN_ISSUER)

        const validToken = jwtUtils.validateToken(token, userName)
        console.log(validToken)
        return validToken
    } catch (error) {
        logger.error(error.message)
        throw new Error(error)
    }
}

export const getApplicant = async (aadhaarNumber: string,applicationNumber: string)=>{
    try {
        const applicantRepo = new ApplicantRepository()
        const result = await applicantRepo.findByAadharNumberAndApplicationNumber(aadhaarNumber, applicationNumber)
        console.log(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
    }
}
export const accessDenied = (url: string, res: Response) => {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'access denied',
    });
}