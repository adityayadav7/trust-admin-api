import { BankDetail } from "./BankDetail";
import { FinancialAssistance } from "./FinancialAssistance";
import { PensionDetail } from "./PensionDetail";

export interface BankInfo {
  financialAssistance: FinancialAssistance;
  pensionDetail: PensionDetail;
  bankDetail: BankDetail;
  uploadBankPassbook: string;
  sourceOfIncome: string;
  monthlyIncome: string;
  otherSourceOfIncome: string;
}
