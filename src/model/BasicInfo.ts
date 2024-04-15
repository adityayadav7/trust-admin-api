// import { ApplicantLanguage } from "../enum/ApplicantLanguage";
// import { MaritalStatus } from "../enum/MaritalStatus";
// import { Occupation } from "../enum/Occupation";
import { AddressDetail } from "./AddressDetail";
import { CurrentLivingDetail } from "./CurrentLivingDetail";

export interface BasicInfo {
  whatsAppNumber: string;
  //currentOccupation: Occupation;
  otherCurrentOccupation: string;
  facilitatorMobile: string;
  firstName: string;
  middleName: string;
  lastName: string;
  applicantMobile: string;
  email: string;
  age: number;
  dateOfBirth: Date;
  education: string;
  // maritalStatus: MaritalStatus;
  // languagePreferences?: ApplicantLanguage[];
  otherLanguage: string;
  addressDetail: AddressDetail;
  currentLivingDetail: CurrentLivingDetail;
  isPhysicallyChallenged: string;
  languagesKnown: string[];
}
