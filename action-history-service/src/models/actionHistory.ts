import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

const ActionHistory = sequelize.define('ActionHistory', {
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    shopId: {
        type: DataTypes.INTEGER,
    },
    plu: {
        type: DataTypes.STRING,
    },
});

export default ActionHistory;
