import { EmergencyContact } from "./EmergencyContact";
import { FamilyMember } from "./FamilyMember";
import { FatherDetail } from "./FatherDetail";
import { HusbandDetail } from "./HusbandDetail";

export interface FamilyInfo {
  husbandDetail: HusbandDetail;
  fatherDetail: FatherDetail;
  familyMembers: FamilyMember[];
  sourceOfIncome: string;
  emergencyContact: EmergencyContact;
}
