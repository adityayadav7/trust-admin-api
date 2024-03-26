import express from 'express';
import { getAllApplicants, getApplicant } from '../controller/admin';
const adminRouter = express.Router();

adminRouter.get('/grants-admin/v1',getAllApplicants)
adminRouter.get('/grants-admin/application/v1', getApplicant)

export { adminRouter };