import { Response } from "express";
import { Constants } from "../common/constants";
import logger from "../common/logger";
import { ApplicantDTO } from "../dto/ApplicantDTO";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { RequestStatus } from "../enums/RequestStatus";
import { Applicant, ApplicantExcel } from "../model/Applicant";
import { GrantApplication } from "../model/GrantApplication";
import { ApplicantRepository } from "../repository/applicantRepository";
import { ExcelGenerator } from "../utils/excelGenerator";

export class AdminService{
    // constructor(private applicantRepo: ApplicantRepository) {}
    async getApplications(requestStatus: RequestStatus, pageNumber: any, pageSize: any): Promise<ApplicantDTO[]> {
        console.log("Get all Applications... applicationStatus[" + requestStatus + "]");
        
        if (!requestStatus) {
          throw new Error(Constants.REQUEST_STATUS_NOT_FOUND);
        }
    
        let applicants: Applicant[] = [];
        const applicantRepo = new ApplicantRepository()
        if (requestStatus === RequestStatus.PENDING) {
          console.log("getApplications: Where ApplicationStatus = CREATED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.CREATED];
          applicants = await applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
        } else if (requestStatus === RequestStatus.PROCESSED) {
          console.log("getApplications: Where ApplicationStatus = APPROVED/REJECTED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED];
          applicants = await applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
        } else if (requestStatus === RequestStatus.SCHEDULED) {
          console.log("getApplications: Where ApplicationStatus = APPROVED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED];
          applicants = await applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
        } else {
          console.log("Incorrect request status...");
          throw new Error(Constants.INCORRECT_REQUEST_STATUS);
        }
        
        const filteredApplicants: ApplicantDTO[] = this.getFilteredApplicants(applicants);
        console.log("applicants returned : ", filteredApplicants.length);
        return filteredApplicants;
      }
      private getFilteredApplicants(applicants: Applicant[]): ApplicantDTO[] {
        console.log("Inside getFilteredApplicants... ");
        const filteredApplicants: ApplicantDTO[] = [];
        console.log(applicants)
        applicants.forEach(applicant => {
          const grantApplication: GrantApplication = applicant.grantApplications.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime())[0];
          
          if (!grantApplication) {
            throw new Error(Constants.GRANT_APPLICANTION_NOT_FOUND);
          }
    
          const filteredApplicant: ApplicantDTO = {
            aadharNumber: applicant._id,
            applicationNumber: grantApplication._id,
            firstName: grantApplication.basicInfo.firstName,
            lastName: grantApplication.basicInfo.lastName,
            applicantMobile: grantApplication.basicInfo.applicantMobile,
            facilitatorMobile: grantApplication.basicInfo.facilitatorMobile,
            state: grantApplication.basicInfo.addressDetail.state,
            city: grantApplication.basicInfo.addressDetail.city,
            approvedAmount: grantApplication.approvedAmount,
            applicationStatus: grantApplication.applicationStatus,
            createdOn: grantApplication.createdOn,
            paymentStartDate: new Date(),
            nextPaymentDate: new Date(),
            expiryDate: new Date()
          };
          filteredApplicants.push(filteredApplicant);
        });
    
        console.log("Exit getFilteredApplicants... ");
        return filteredApplicants;
      }
      
      async excelApprovedApplicationsReport(){
        logger.debug("Inside excelApprovedApplicationsReport ")

        // const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED];
        const applicantRepo = new ApplicantRepository()
        const applicants: ApplicantExcel[] =  await applicantRepo.getAllApprovedApplications();
        console.log(applicants)
        const excelGenerator = new ExcelGenerator()
        const buffer = await excelGenerator.applicantsToExcel(applicants)
        return buffer
      }
      async excelAllApplicationsReport(){
        logger.debug("Inside excelApprovedApplicationsReport ")

        const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED, ApplicationStatus.CREATED, ApplicationStatus.REJECTED];
        const applicantRepo = new ApplicantRepository()
        const applicants: ApplicantExcel[] =  await applicantRepo.getAllApplications(statuses);
        console.log(applicants)
        const excelGenerator = new ExcelGenerator()
        const buffer = await excelGenerator.applicantsToExcel(applicants)
        return buffer
      }
}