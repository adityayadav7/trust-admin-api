import mongoose, { Schema, Document } from 'mongoose';
import { GrantApplication, GrantApplicationSchema } from './GrantApplication';

interface Applicant extends Document {
    _id: string;
    grantApplications: [GrantApplication];
    createdOn: Date
    modifiedOn: Date
}

const NewApplicantSchema = new Schema<Applicant>({
    _id: { type: String, required: true },
    grantApplications:[GrantApplicationSchema],
    createdOn: {type: Date, required: true},
    modifiedOn: {type: Date, required: false}
});

const NewApplicantModel = mongoose.model<Applicant>('NewApplicants', NewApplicantSchema);

export { Applicant, NewApplicantModel };
