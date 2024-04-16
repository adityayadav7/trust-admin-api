import { Request, Response } from "express";
import logger from "../common/logger";
import { AdminService } from "../services/admin-service";
import { NewApplicantModel } from "../model/Applicant";
import { RequestStatus } from "../enums/RequestStatus";
import { ApplicantRepository } from "../repository/applicantRepository";

export const getAllApplicants = async (req:Request, res: Response) =>{
    const { pageNumber, pageSize} = req.query
    const status : RequestStatus = req.query?.[`status`] as RequestStatus || undefined
    // const pageNumber: any = req.query.pageNumber
    logger.info('Get all applications...')
    try {
        const adminService = new AdminService()
        const result = await adminService.getApplications(status, pageNumber, pageSize)
        console.log("+++++++++++++++++RESULT++++++++++++++")
        console.log(result)
        res.json(result)
    } catch (error) {
        logger.error(`Error getting all applicants ${error}`)
        res.sendStatus(500).json(error)
    }
}

export const getApplicant = async (req:Request, res: Response)=>{
    const aadhaarNumber = req.query.aadharNumber as String;
    const applicationNumber =  req.query.applicationNo as String;
    console.log(aadhaarNumber, applicationNumber)
    try {
        const applicantRepo = new ApplicantRepository()
        const result = await applicantRepo.findByAadharNumberAndApplicationNumber(aadhaarNumber, applicationNumber)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        res.status(500).send(error);
    }
}
function setExcelHeaders(res: Response) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'application.xlsx',
    );
  }
export const excelApprovedApplicationsReport = async (req:Request, res: Response)=>{
    logger.info('Generating Excel sheet for approved applications report');
    const adminService=new AdminService();
    const bufferData = await adminService.excelApprovedApplicationsReport();
    setExcelHeaders(res)
    res.send(bufferData);
}

export const excelAllApplicationsReport=async (req: Request, res:Response)=> {
    logger.info('Generating Excel sheet for all the applications report');
    const adminService=new AdminService();
    const bufferData = await adminService.excelAllApplicationsReport();
    setExcelHeaders(res)
    res.send(bufferData);
}