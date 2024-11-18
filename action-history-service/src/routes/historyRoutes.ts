import express from 'express';
import { Op } from 'sequelize'; // Import Op for query filters
import ActionHistory from '../models/actionHistory';

const router = express.Router();

router.post('/history', async (req, res) => {
    const { action, shopId, plu } = req.body;
    try {
        const event = await ActionHistory.create({ action, shopId, plu });
        res.json(event);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/history', async (req, res) => {
    const { shopId, plu, from, to, action } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1; // Convert page to a number or default to 1
    const size = parseInt(req.query.size as string, 10) || 10; // Convert size to a number or default to 10
    const offset = (page - 1) * size;

    try {
        const where: any = {};
        if (shopId) where.shopId = shopId;
        if (plu) where.plu = plu;
        if (from && to) where.timestamp = { [Op.between]: [new Date(from as string), new Date(to as string)] };
        if (action) where.action = action;

        const history = await ActionHistory.findAndCountAll({
            where,
            limit: size,
            offset,
        });

        res.json({
            data: history.rows,
            total: history.count,
            page,
            size,
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

export default router;
