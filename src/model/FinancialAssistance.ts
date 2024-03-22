export interface FinancialAssistance {
    isPreviouslyReceived: boolean;
    details: string;
    fromChildren: string;
    fromRelatives: string;
    fromTrust: string;
    fromOther: string;
  }
  
 export const financialAssistance = {
    isPreviouslyReceived: Boolean,
    details: String,
    fromChildren: String,
    fromRelatives: String,
    fromTrust: String,
    fromOther: String
};