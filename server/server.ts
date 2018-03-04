import * as express from 'express';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Express settings
import { config } from './lib/config';

config(app);

// Routing
app.get('/*', (req, res) => res.render('index'));

const port = process.env.port || process.env.PORT || 9000;

// Start server
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
export default app;