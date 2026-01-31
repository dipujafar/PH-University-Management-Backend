import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routers';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  // Promise.reject();
  res.send('Server is running');
});

app.use(globalErrorHandler);


// not found route
app.use(notFound);

export default app;
