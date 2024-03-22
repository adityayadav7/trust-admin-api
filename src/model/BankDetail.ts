export interface BankDetail {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    branchName: string;
    branchIFSC: string;
    branchAddress: string;
    uploadCancelledCheque: string;
    isJointAccount: boolean;
    jointAccountHolderName: string;
    joinAccountHolderMobile: string;
    accountOperator: string;
    otherAccountOperatorName: string;
    accountOperatorMobile: string;
  }
  
  export const bankDetailSchema = {
    accountNumber: String,
    accountHolderName: String,
    bankName: String,
    branchName: String,
    branchIFSC: String,
    branchAddress: String,
    uploadCancelledCheque: String,
    isJointAccount: Boolean,
    jointAccountHolderName: String,
    jointAccountHolderMobile: String,
    accountOperator: String,
    otherAccountOperatorName: String,
    accountOperatorMobile: String
};
