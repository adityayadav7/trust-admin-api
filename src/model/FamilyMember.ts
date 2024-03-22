import { Gender } from "../enum/Gender";


export interface FamilyMember {
  memberName: string;
  memberAge: Date; // Assuming this represents the date of birth
  age: number;
  memberGender: Gender;
  memberRelation: string;
  isLivingWithYou: boolean;
  education: string;
  memberContact: string;
  isLivingWithYou1: string;
}
