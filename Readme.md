## DDTraceImp
1. nvm use 18
2. npm install
3. node server1.js - runs express server at 3000
4. node server2.js - runs express server at 3001
5. `curl --header "X-request-id: 123"  http://localhost:3000`
6. Logs in server1.js
```
{"dd":{"env":"development","service":"exampleService","version":"1.0.0"},"level":"info","message":"Example app listening on port 3000"}
{"dd":{"env":"development","service":"exampleService","span_id":"6131177105155605196","trace_id":"9120390628908172821","version":"1.0.0"},"headers":{"x-request-id":"123"},"level":"info","message":"welcome"}
{"dd":{"env":"development","service":"exampleService","span_id":"6131177105155605196","trace_id":"9120390628908172821","version":"1.0.0"},"level":"info","message":"123"}
200
```
7. Logs in server2.js
```
{"dd":{"env":"development","service":"exampleService","version":"1.0.0"},"level":"info","message":"Example app listening on port 3001"}
{"dd":{"env":"development","service":"exampleService","span_id":"4929062540452922770","trace_id":"9120390628908172821","version":"1.0.0"},"level":"info","message":"welcome","requestId":"123"}
```
8. Observe trace_id in both the server's logs match