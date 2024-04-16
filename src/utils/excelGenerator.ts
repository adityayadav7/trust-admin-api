import * as ExcelJS from "exceljs";
import {
  ApplicantExcel,
} from "../model/Applicant";

export class ExcelGenerator {
  getExcelColumns() {
    return [
      // { header: 'ID', key: 'candidate_id', width: 27 },
      { header: "Aadhaar Number", key: "id", width: 32 },
      { header: "Name", key: "applicant_name", width: 32 },
      { header: "Applicant Mobile", key: "applicantMobile", width: 32 },
      { header: "Education", key: "education", width: 32 },
      { header: "Age", key: "age", width: 32 },
      { header: "Marital Status", key: "maritalStatus", width: 32 },
      { header: "Family Members", key: "familyMembers", width: 32 },
      { header: "Facilitator Mobile", key: "facilitatorMobile", width: 32 },
      { header: "Application Status", key: "applicationStatus", width: 32 },
      { header: "Approved Amount", key: "approvedAmount", width: 32 },
      { header: "Approved By", key: "approvedBy", width: 32 },
    ];
  }
  addApplicationRow(worksheet: ExcelJS.Worksheet, applicant: ApplicantExcel) {
    worksheet.addRow({
      id: applicant._id,
      applicant_name:
        applicant.grantApplications.basicInfo.firstName +
        " " +
        applicant.grantApplications.basicInfo.lastName,
      applicantMobile: applicant.grantApplications.basicInfo.applicantMobile,
      education: applicant.grantApplications.basicInfo.education,
      age: applicant.grantApplications.basicInfo.age,
      maritalStatus: applicant.grantApplications.basicInfo.maritalStatus,
      familyMembers: applicant.grantApplications.familyInfo.familyMembers
        ? applicant.grantApplications.familyInfo.familyMembers.length.toString()
        : "0",
      facilitatorMobile:
        applicant.grantApplications.basicInfo.facilitatorMobile,
      applicationStatus: applicant.grantApplications.applicationStatus
        ? "PENDING"
        : applicant.grantApplications.applicationStatus,
        approvedAmount: applicant.grantApplications.approvedAmount,
        approvedBy: applicant.grantApplications.approvedBy
    });
  }

  async applicantsToExcel(applicants: ApplicantExcel[]) {
    console.log(
      "Inside applicantsToExcel... Applicant List Size",
      applicants.length
    );
   
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Applications');
    worksheet.columns = this.getExcelColumns();
    applicants.forEach((applicant) => {
      this.addApplicationRow(worksheet, applicant);
    });
    return workbook.xlsx.writeBuffer();
  }
  //   const workbook = new ExcelJS.Workbook();
  //   const sheet = workbook.addWorksheet("Applicants");

  //   const headerFont = { bold: true };
  //   const headerCellStyle = { font: headerFont };
  //   const ageCellStyle = { numFmt: "#" };

  //   // Header
  //   const headerRow = sheet.addRow(COLUMNs);
  //   headerRow.eachCell((cell) => {
  //     cell.style = headerCellStyle;
  //   });

    

  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const stream = new Stream.PassThrough();
  //   stream.end(buffer);

  //   console.log("Excel doc generated and returned");
  //   return stream;
  // }
}
