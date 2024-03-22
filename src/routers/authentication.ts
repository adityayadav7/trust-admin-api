import express from 'express';
import { login } from '../auth/controller/login';
const router = express.Router();

router.post('/grants-admin/login/v1',login)

export { router };