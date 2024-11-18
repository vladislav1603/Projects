const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const sequelize = require('../config/database');

const app = express();
app.use(bodyParser.json());
app.use('/api', productRoutes);
app.use('/api', balanceRoutes);

sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.PORT, () => console.log(`Goods Service running on port ${process.env.PORT}`));
});
