import 'reflect-metadata';
import express, {Express, NextFunction, Request as ExRequest, Response as ExResponse} from 'express';
import helmet                                                                         from 'helmet';
import swaggerUi                                                                      from 'swagger-ui-express';
import {ValidateError}                                                                from 'tsoa';
import {RegisterRoutes}                                                               from '../tsoa/routes';
import '@database';
import {terminal}                                                                     from 'terminal-kit';


const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle security and origin in production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (req: express.Request, res: express.Response) => {
  return res.send(swaggerUi.generateHTML(await import('../tsoa/swagger.json')));
});

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
      statusCode: 422,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }

  next();
});

app.use(function notFoundHandler(_req, res: express.Response) {
  return res.status(404).send({message: 'Not Found'});
});

app.listen(process.env.PORT, () => {
  terminal.green(`[Express] - Application listening on port: ${process.env.PORT} \n`);

});

export default app;