const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port, () => {'API server listening on port: ' + port});
