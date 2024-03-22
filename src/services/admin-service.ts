import { Constants } from "../common/constants";
import { ApplicantDTO } from "../dto/ApplicantDTO";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { RequestStatus } from "../enums/RequestStatus";
import { Applicant } from "../model/Applicant";
import { GrantApplication } from "../model/GrantApplication";

export class AdminService{
    constructor(private applicantRepo: any) {}
    async getApplications(requestStatus: RequestStatus, pageNumber: number, pageSize: number): Promise<ApplicantDTO[]> {
        console.log("Get all Applications... applicationStatus[" + requestStatus + "]");
        
        if (!requestStatus) {
          throw new Error(Constants.REQUEST_STATUS_NOT_FOUND);
        }
    
        let applicants: Applicant[] = [];
    
        if (requestStatus === RequestStatus.PENDING) {
          console.log("getApplications: Where ApplicationStatus = CREATED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.CREATED];
          applicants = await this.applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
        } else if (requestStatus === RequestStatus.PROCESSED) {
          console.log("getApplications: Where ApplicationStatus = APPROVED/REJECTED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED];
          applicants = await this.applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
        } else if (requestStatus === RequestStatus.SCHEDULED) {
          console.log("getApplications: Where ApplicationStatus = APPROVED");
          const statuses: ApplicationStatus[] = [ApplicationStatus.APPROVED];
          applicants = await this.applicantRepo.getApplicationsByStatus(statuses, pageNumber, pageSize);
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
        applicants.forEach(applicant => {
          const grantApplication: GrantApplication = applicant.grantApplication.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime())[0];
          
          if (!grantApplication) {
            throw new Error(Constants.GRANT_APPLICANTION_NOT_FOUND);
          }
    
          const filteredApplicant: ApplicantDTO = {
            aadharNumber: applicant.aadharNumber,
            applicationNumber: grantApplication.applicationNumber,
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
}