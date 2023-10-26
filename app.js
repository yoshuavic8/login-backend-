require('dotenv').config(); // Load environment variables

const express = require('express');
const dbConnect = require('./db');


const hostname = process.env.SERVER_HOST;
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


dbConnect();

const corsOptions = require('./middleware/cors');
const sessionMiddleware = require ('./middleware/session');
const passportMiddleware = require ('./middleware/passport');

app.use(corsOptions);
app.use(sessionMiddleware);
app.use(passportMiddleware);


const secretsRoutes = require('./routes/secretRoute');
const authRoutes = require ('./routes/authRoute');

app.use('/secret',secretsRoutes);
app.use('/auth', authRoutes);


app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname} on port ${port}`);
});
