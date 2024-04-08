import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { router } from './routes/route';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from './common/logger';
import { router } from './routers/authentication';
import { getApplicant, initSetup, tokenValidation } from './auth/utils/utils';
import { adminRouter } from './routers/admin';
import { Constants } from './common/constants';

const app: Application = express();
const port: any = Constants.PORT;
app.use(cors());
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(Constants.DB_URL, {

})
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
  });
app.use('/',router);
app.use('/',adminRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, School Admission App');
  });
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
initSetup(Constants.USER_NAME, Constants.PASSWORD, Constants.RUN_POST_CONSTRUCT_SCRIPT)
// tokenValidation('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcxMTA4NTk2NiwiZXhwIjoxNzExMjU4NzY2LCJpc3MiOiJkbWFydEFTTCJ9.pW_BFpKcS75lEt48yw2ZBOPKY7Se7REcIdlbQNdv-LQ',
// 'admin'
// )
// getApplicant('973333133334','24/03/2024323155')