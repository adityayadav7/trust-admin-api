import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { accessDenied, tokenValidation } from "../auth/utils/utils";
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    // Get token from header
    const requestHeader = req.headers.authorization
    const token: any = requestHeader?.replace('Bearer ', '');
    const decodedToken = jwt.decode(token, { complete: true });
    console.log("Decoded Token",decodedToken?.payload.sub);
    const userDetails:any = {
        username: decodedToken?.payload.sub
    }
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
       await tokenValidation(token, userDetails)
        next()
    } catch (error) {
       return res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: req.url,
            message: 'access denied',
          });
    }
    
    // if(!validToken){
    //     return  accessDenied(req.url, res)
    // }
    // next()
    
}