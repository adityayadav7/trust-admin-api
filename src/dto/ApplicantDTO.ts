import { ApplicationStatus } from "../enums/ApplicationStatus";

export class ApplicantDTO {
  aadharNumber: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  applicantMobile: string;
  facilitatorMobile: string;
  state: string;
  city: string;
  approvedAmount: number;
  applicationStatus: ApplicationStatus;
  createdOn: Date;
  paymentStartDate: Date;
  nextPaymentDate: Date;
  expiryDate: Date;
  age : number
}
