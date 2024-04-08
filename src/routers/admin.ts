import express from 'express';
import { getAllApplicants, getApplicant } from '../controller/admin';
import { authenticateToken } from '../middleware/jwtAuthentication';
const adminRouter = express.Router();

adminRouter.get('/grants-admin/v1', authenticateToken, getAllApplicants)
adminRouter.get('/grants-admin/application/v1',authenticateToken, getApplicant)

export { adminRouter };