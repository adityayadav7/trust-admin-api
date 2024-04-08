import dotenv from 'dotenv'
dotenv.config()

export const Constants = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL || '' ,
    USER_NAME: process.env.USER_NAME || 'admin',
    PASSWORD: process.env.PASSWORD || '1233',
    RUN_POST_CONSTRUCT_SCRIPT: 'true',
    TOKEN_VALIDITY: 172800000,
    TOKEN_SIGNING_KEY: '$dmartCorporate%975*',
    TOKEN_ISSUER: 'dmartASL',
    CSV: "\\s*,\\s*",
    APPLICANT_DATA_NOT_FOUND: "Applicant(s) Data Not Found",
    INCORRECT_REQUEST_STATUS: "Only allowed request status are PENDING and PROCESSED.",
    REQUEST_STATUS_NOT_FOUND: "Request Status not found. Allowed Status : PENDING and PROCESSED",
    GRANT_APPLICANTION_NOT_FOUND: "Grant application not found :",
    INCORRECT_OPERATION_REQUEST: "Please provide correct operation value. Allowed Operation : [APPROVE/REJECT]",
    FILE_NOT_FOUND: "There is no file found for :"
  };
  