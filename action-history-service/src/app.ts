import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import historyRoutes from './routes/historyRoutes';
import sequelize from '../config/database';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', historyRoutes);

sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.PORT, () => console.log(`History Service running on port ${process.env.PORT}`));
});
