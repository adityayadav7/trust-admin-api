import express from 'express';
import { getAllApplicants, getApplicant, processApplication} from '../controller/admin';
const adminRouter = express.Router();

adminRouter.get('/grants-admin/v1',getAllApplicants)
adminRouter.get('/grants-admin/application/v1', getApplicant)
adminRouter.put('/grants-admin/v1', processApplication)

export { adminRouter };