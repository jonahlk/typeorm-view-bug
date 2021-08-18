const { generateRoutes, generateSpec } = require('tsoa');

(async () => {
  const specOptions = {
    basePath: '/',
    entryFile: 'src/app.ts',
    noImplicitAdditionalProperties: 'throw-on-extras',
    controllerPathGlobs: ['src/**/*.controller.ts'],
    outputDirectory: 'tsoa',
    specVersion: 3,
  };

  const routeOptions = {
    middleware: 'express',
    basePath: '/',
    entryFile: 'src/app.ts',
    noImplicitAdditionalProperties: 'throw-on-extras',
    controllerPathGlobs: ['src/**/*.controller.ts'],
    routesDir: 'tsoa',
  };

  await generateSpec(specOptions);
  await generateRoutes(routeOptions);
})();