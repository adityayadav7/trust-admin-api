import mongoose from "mongoose";
import {
  Applicant,
  ApplicantExcel,
  NewApplicantModel,
} from "../model/Applicant";

export class ApplicantRepository {
  async getApplicationsByStatus(
    statuses: string[],
    pageNumber?: number,
    pageSize?: any
  ): Promise<Applicant[]> {
    const skip = (pageNumber - 1) * pageSize;
    const applicants = await NewApplicantModel.aggregate([
      { $unwind: "$grantApplications" },
      { $match: { "grantApplications.applicationStatus": { $in: statuses } } },
      { $sort: { createdOn: 1 } },
      {
        $group: {
          _id: "$_id",
          grantApplications: { $push: "$grantApplications" },
        },
      },
      { $skip: skip },
      { $limit: parseInt(pageSize) },
    ]);
    return applicants;
  }

  async findByAadharNumberAndApplicationNumber(
    aadharNumber: any,
    applicationNumber: any
  ): Promise<Applicant | any> {
    const applicant = await NewApplicantModel.findOne({
      _id: aadharNumber,
      "grantApplications._id": applicationNumber,
    });
    //   const applicant = await NewApplicantModel.findOne({
    //     "_id": aadharNumber,
    //     "grantApplications": {
    //         $elemMatch: {
    //             "applicationNumber": applicationNumber
    //         }
    //     }
    // });
    return applicant;
  }
  async getApprovedApplicationsById(id: string, statuses: any): Promise<ApplicantExcel[]> {
    const approvedApplications = await NewApplicantModel.aggregate([
        { $match: { _id: id } },
        { $unwind: "$grantApplications" }, // Unwind the grantApplications array
        { $match: { "grantApplications.applicationStatus": statuses } }, 
        { $sort: { "grantApplications.createdOn": -1 } }, // Sort by createdOn in descending order
        { $limit: 1 },
    ]);

    return approvedApplications; // Returns all approved applications for the specified applicant ID
}
  async getAllApprovedApplications(): Promise<ApplicantExcel[]> {
    const applicants = await NewApplicantModel.aggregate([
      { $unwind: "$grantApplications" },
      { $match: { "grantApplications.applicationStatus": "APPROVED" } },
    ]);
    return applicants;
  }
  async getAllApplications(statuses): Promise<ApplicantExcel[]> {
    const applicants = await NewApplicantModel.aggregate([
      { $unwind: "$grantApplications" },
      { $match: { "grantApplications.applicationStatus":  { $in: statuses }} },
    ]);
    return applicants;
  }
}
