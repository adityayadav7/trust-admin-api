import { Request, Response } from "express";
import logger from "../common/logger";

export const getAllApplicants = async (req:Request, res: Response) =>{
    logger.info('Get all applications...')
    
}