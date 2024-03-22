import mongoose, { Document, Schema } from "mongoose";
import { BankInfo } from "./BankInfo";
import { BasicInfo } from "./BasicInfo";
import { DocumentDetail, documentDetailSchema } from "./DocumentDetail";
import { FamilyInfo } from "./FamilyInfo";

import { pensionDetail } from "./PensionDetail";
import { financialAssistance } from "./FinancialAssistance";
import { bankDetailSchema } from "./BankDetail";
import { ApplicationStatus } from "../enums/ApplicationStatus";
import { Occupation } from "../enums/Occupation";
import { MaritalStatus } from "../enums/MaritialStatus";
import { LivingWith } from "../enums/LivingWith";
import { HouseType } from "../enums/HouseType";
import { Gender } from "../enums/Gender";

export interface GrantApplication extends Document {
  applicationNumber: string;
  applicantPhotoPath: string;
  basicInfo: BasicInfo;
  familyInfo: FamilyInfo;
  bankInfo: BankInfo;
  approvedAmount: number;
  additionalDetails: string;
  approvedBy: string;
  aadharPhotoPath: string;
  additionalDocPath: string;
  applicationStatus: ApplicationStatus;
  createdOn: Date;
  modifiedOn?: Date;
  cancelledChequePhotoPath?: string;
  documentDetail?: DocumentDetail;
  paymentStartDate?: string;
}

export const GrantApplicationSchema = new Schema<GrantApplication>({
  applicationNumber: String,
  applicantPhotoPath: String,
  basicInfo: {
    whatsAppNumber: String,
    currentOccupation: {
      type: String,
      enum: Object.values(Occupation),
    },
    otherCurrentOccupation: String,
    facilitatorMobile: String,
    firstName: String,
    middleName: String,
    lastName: String,
    applicantMobile: String,
    email: String,
    age: Number,
    dateOfBirth: Date,
    education: String,
    maritalStatus: {
      type: String,
      enum: Object.values(MaritalStatus),
    },
    languagePreferences: [String],
    otherLanguage: String,
    addressDetail: {
      details: String,
      city: String,
      postOffice: String,
      state: String,
      pincode: String,
      permanent: String,
    },
    currentLivingDetail: {
      withWhom: {
        type: String,
        enum: Object.values(LivingWith),
      },
      isCurrentStayGte12Mnt: Boolean,
      previousStayLocation: String,
      previousStayMonths: Number,
      typeOfHouse: {
        type: String,
        enum: Object.values(HouseType),
      },
      withWhomOther: String,
    },
    isPhysicallyChallenged: String,
    languagesKnown: [String],
  },
  familyInfo: {
    husbandDetail: {
      husbandName: String,
      husbandMobile: String,
      dateOfDivorce: Date,
      dateOfDeath: Date,
      uploadHusbandDeathCertificate: String,
    },
    fatherDetail: {
      fatherName: String,
      fatherAddress: String,
      fatherMobile: String,
    },
    familyMembers: [
      {
        memberName: String,
        memberAge: Date,
        age: Number,
        memberGender: {
          type: String,
          enum: Object.values(Gender),
        },
        memberRelation: String,
        isLivingWithYou: Boolean,
        education: String,
        memberContact: String,
        isLivingWithYou1: String,
      },
    ],
    sourceOfIncome: String,
    emergencyContact: {
      personName: String,
      personMobile: String,
      personRelationship: String,
      personAddress: String,
    },
  },
  bankInfo: {
    financialAssistance: financialAssistance,
    pensionDetail: pensionDetail,
    bankDetail: bankDetailSchema,
    uploadBankPassbook: String,
    sourceOfIncome: String,
    monthlyIncome: String,
    otherSourceOfIncome: String,
  },
  approvedAmount: Number,
  additionalDetails: String,
  approvedBy: String,
  aadharPhotoPath: String,
  additionalDocPath: String,
  applicationStatus: {
    type: String,
    enum: Object.values(ApplicationStatus),
  },
  createdOn: Date,
  modifiedOn: Date,
  cancelledChequePhotoPath: String,
  documentDetail: documentDetailSchema,
  paymentStartDate: String,
});

// Compile the schema into a model
//   const GrantApplicationModel = mongoose.model<GrantApplication>('GrantApplication', GrantApplicationSchema);

//   export default GrantApplicationModel;
