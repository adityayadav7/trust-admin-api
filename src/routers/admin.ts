import express from "express";
import {
  excelAllApplicationsReport,
  excelApprovedApplicationsReport,
  processApplication,
  getAllApplicants,
  getApplicant,
  excelOneApplicationsReport,
  terminateApplication,
} from "../controller/admin";
import { authenticateToken } from "../middleware/jwtAuthentication";
const adminRouter = express.Router();

adminRouter.get("/grants-admin/v1", authenticateToken, getAllApplicants);
adminRouter.get(
  "/grants-admin/application/v1",
  authenticateToken,
  getApplicant
);
adminRouter.get(
    "/grants-admin/v1/download/one",
    authenticateToken,
    excelOneApplicationsReport
  );
adminRouter.get(
  "/grants-admin/v1/download/approved",
  authenticateToken,
  excelApprovedApplicationsReport
);
adminRouter.get(
  "/grants-admin/v1/download/all",
  authenticateToken,
  excelAllApplicationsReport
);

adminRouter.put(
  "/grants-admin/application/v1",
  // authenticateToken,
  terminateApplication
)

adminRouter.put('/grants-admin/v1', authenticateToken, processApplication)

export { adminRouter };
