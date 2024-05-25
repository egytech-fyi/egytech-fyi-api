import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { SwaggerUI, swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { swaggerSpec } from './config/swaggerSpec';
import routes from './routes';
import { Bindings } from './types/bindings';

const app = new Hono<{ Bindings: Bindings }>();

app.use(prettyJSON());

app.use(cors({ origin: '*' }));

app.get("/doc", (c) =>
  c.text(swaggerSpec, { headers: { "Content-Type": "application/yaml" } })
);

app.get("/", (c) => {
  return c.html(`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="egytech.api API Documentation" />
        <title>egytech.fyi API Documentation</title>
      </head>
      <body>
        ${SwaggerUI({ url: '/doc' })}
      </body>
    </html>
  `);
});

routes(app);

export default app;
