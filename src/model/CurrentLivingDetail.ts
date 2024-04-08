import { HouseType } from "../enums/HouseType";
import { LivingWith } from "../enums/LivingWith";



export interface CurrentLivingDetail {
    withWhom: LivingWith;
    isCurrentStayGte12Mnt: boolean;
    previousStayLocation?: string;
    previousStayMonths?: number;
    typeOfHouse: HouseType;
    withWhomOther?: string;
  }