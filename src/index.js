const serverless = require('serverless-http');
const express = require('express');
const app = express();

const authRoutes = require('./routes/auth.routes');
const petRoutes = require('./routes/pet.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/pet', petRoutes);
app.use('/user', userRoutes);

module.exports.handler = serverless(app);
