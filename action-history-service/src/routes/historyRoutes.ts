import express from 'express';
import ActionHistory from '../models/actionHistory';
import { Op } from 'sequelize';

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
    const { shopId, plu, from, to, action, page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;

    try {
        const where: any = {};
        if (shopId) where.shopId = shopId;
        if (plu) where.plu = plu;
        if (from && to) where.timestamp = { [Op.between]: [from, to] };
        if (action) where.action = action;

        const history = await ActionHistory.findAndCountAll({
            where,
            limit: Number(size),
            offset,
        });

        res.json({ data: history.rows, total: history.count });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

export default router;
