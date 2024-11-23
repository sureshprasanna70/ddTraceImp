process.env.DD_ENV = 'development';
process.env.DD_SERVICE = 'exampleService';
process.env.DD_LOGS_INJECTION = true;
const ddtrace = require('dd-trace').init();
const express = require('express');
const app = express()
const port = 3000
const winston = require('winston');
const axios = require('axios');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});


app.get('/', (req, res) => {
    const span = ddtrace.scope().active()
    span.setTag('uuid', req.header('x-request-id'));
    logger.info("welcome",{headers: {"x-request-id": req.header("x-request-id")}});
    logger.info(req.header('x-request-id'));
  
    axios.get('http://localhost:3001/service2',{headers: {"x-request-id": req.header("x-request-id")}})
    .then(function (response) {
      // handle success
      console.log(response.status);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    res.send('Hello World!');
  
  })

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
})
