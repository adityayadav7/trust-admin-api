import mongoose, { Schema, Document } from 'mongoose';
import { GrantApplication, GrantApplicationSchema } from './GrantApplication';

interface Applicant extends Document {
    aadharNumber: string;
    grantApplication: [GrantApplication];
    createdOn: Date
    modifiedOn: Date
}

const NewApplicantSchema = new Schema<Applicant>({
    aadharNumber: { type: String, required: true },
    grantApplication:[GrantApplicationSchema],
    createdOn: {type: Date, required: true},
    modifiedOn: {type: Date, required: false}
});

const NewApplicantModel = mongoose.model<Applicant>('NewApplicant', NewApplicantSchema);

export { Applicant, NewApplicantModel };
