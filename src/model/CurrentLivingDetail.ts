// import { HouseType } from "../enum/HouseType";
// import { LivingWith } from "../enum/LivingWith";


export interface CurrentLivingDetail {
    //withWhom: LivingWith;
    isCurrentStayGte12Mnt: boolean;
    previousStayLocation?: string;
    previousStayMonths?: number;
    //typeOfHouse: HouseType;
    withWhomOther?: string;
  }