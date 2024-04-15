import { ApplicationStatus } from "../enums/ApplicationStatus";

export class ApplicationProcessRequest {

    constructor(public aadharNumber: string,
        public applicationNumber: string,
        public operation: ApplicationStatus,
        public approvedBy: string,
        public approvedAmount: number,
        public paymentStartDate:Date) {}
    
    validate(): void {
        if(this.aadharNumber.length!=12) {
            throw "Invalid aadhar number";
        }
        if(this.operation!=ApplicationStatus.APPROVED && this.operation!=ApplicationStatus.REJECTED) {
            throw "Invald operation"
        }
    }
}





