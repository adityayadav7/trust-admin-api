import { Applicant, NewApplicantModel } from "../model/Applicant";

export class ApplicantRepository{
    async getApplicationsByStatus(statuses: string[], pageNumber: number, pageSize: any): Promise<Applicant[]> {
        console.log(typeof pageSize)
        const skip = (pageNumber - 1) * pageSize;
        const applicants = await NewApplicantModel.aggregate([
          { $unwind: '$grantApplications' },
          { $match: { 'grantApplications.applicationStatus': { $in: statuses } } },
          { $sort: { createdOn: 1 } },
          { $group: { _id: '$_id', grantApplications: { $push: '$grantApplications' } } },
          { $skip: skip },
          { $limit: parseInt(pageSize) }
        ]);
        return applicants;
      }
    
      async findByAadharNumberAndApplicationNumber(aadharNumber: any, applicationNumber: any): Promise<Applicant | null> {
        const applicant = await NewApplicantModel.findOne({
         "_id": aadharNumber,
          'grantApplications._id': applicationNumber
        });
        return applicant;
      }
}
