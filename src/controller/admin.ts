import { Request, Response } from "express";
import logger from "../common/logger";
import { AdminService } from "../services/admin-service";
import { RequestStatus } from "../enums/RequestStatus";
import { ApplicantRepository } from "../repository/applicantRepository";
import { ApplicationProcessRequest } from "../dto/ApplicationProcessRequest";

export const getAllApplicants = async (req: Request, res: Response) => {
  const { pageNumber, pageSize } = req.query;
  const status: RequestStatus =
    (req.query?.[`status`] as RequestStatus) || undefined;
  logger.info("Get all applications...");
  try {
    const adminService = new AdminService();
    const result = await adminService.getApplications(
      status,
      pageNumber,
      pageSize
    );
    logger.info("+++++++++++++++++RESULT++++++++++++++");
    logger.info(result);
    res.json(result);
  } catch (error) {
    logger.error(`Error getting all applicants ${error}`);
    res.sendStatus(500).json(error);
  }
};

export const getApplicant = async (req: Request, res: Response) => {
  const aadhaarNumber = req.query.aadharNumber as String;
  const applicationNumber = req.query.applicationNo as String;
  try {
    const applicantRepo = new ApplicantRepository();
    const result = await applicantRepo.findByAadharNumberAndApplicationNumber(
      aadhaarNumber,
      applicationNumber
    );
    logger.log(result);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const processApplication = async (req: Request, res: Response) => {
  const {
    aadharNumber,
    applicationNumber,
    approvedAmount,
    approvedBy,
    operation,
    paymentStartDate,
  } = req.body;
  const applicationProcessRequest = new ApplicationProcessRequest(
    aadharNumber,
    applicationNumber,
    operation,
    approvedBy,
    approvedAmount,
    paymentStartDate
  );
  try {
    applicationProcessRequest.validate();
  } catch (error) {
    res.status(400).send(error);
    return;
  }
  try {
    const adminService = new AdminService();
    const result = await adminService.processApplication(
      applicationProcessRequest
    );
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};

function setExcelHeaders(res: Response) {
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "application.xlsx"
  );
}

export const excelOneApplicationsReport = async (
  req: Request,
  res: Response
) => {
  const aadhaarNumber = req.query.aadharNumber as String;
  const status = req.query.status as String;
  logger.info("Generating Excel sheet for single applications report");
  const adminService = new AdminService();
  const bufferData = await adminService.excelOneApplicationsReport(
    aadhaarNumber,
    status
  );
  setExcelHeaders(res);
  res.send(bufferData);
};

export const excelApprovedApplicationsReport = async (
  req: Request,
  res: Response
) => {
  logger.info("Generating Excel sheet for approved applications report");
  const adminService = new AdminService();
  const bufferData = await adminService.excelApprovedApplicationsReport();
  setExcelHeaders(res);
  res.send(bufferData);
};

export const excelAllApplicationsReport = async (
  req: Request,
  res: Response
) => {
  logger.info("Generating Excel sheet for all the applications report");
  const adminService = new AdminService();
  const bufferData = await adminService.excelAllApplicationsReport();
  setExcelHeaders(res);
  res.send(bufferData);
};

export const terminateApplication = async (req: Request, res: Response) => {
  const aadhaarNumber = req.query.aadharNumber as String;
  const applicationNumber = req.query.applicationNo as String;
  logger.info("Terimating applications...");

  try {
    const applicantRepo = new ApplicantRepository();
    const result = await applicantRepo.updateTermination(aadhaarNumber, applicationNumber)
    console.log(result)
    logger.info("Application terminated successfully...")
    res.status(200).send({ message: "Application terminated successfully" });
  } catch (error) {
    logger.error("Error occur while terminating application ",error)
    res.sendStatus(500).json({message:"Application not Terminated"});

  }
};
