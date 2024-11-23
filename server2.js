process.env.DD_ENV = 'development';
process.env.DD_SERVICE = 'exampleService';
process.env.DD_LOGS_INJECTION = true;
const ddtrace = require('dd-trace');
ddtrace.init();
const express = require('express');
const app = express()
const port = 3001
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});



app.get('/service2', (req, res) => {
  logger.info("welcome",{"requestId": req.header('x-request-id')});
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
})
