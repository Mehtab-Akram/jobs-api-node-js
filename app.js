require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')

// Extra security packages
const helmet = require('helmet') // Add different header to our requests for security.
const cors = require('cors') // allows our app to be accessed from the out side world i.e. from a different domain.
const xss = require('xss-clean')// Prevents cross site scripting.
const rateLimiter = require('express-rate-limit') // Limits the number of requests to our application.

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const authenticationMiddleWare = require('./middleware/authentication');


app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter())
// extra packages
// connect DB
// routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/jobs', authenticationMiddleWare, jobs)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
