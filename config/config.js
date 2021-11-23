const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 1600,
    user: process.env.USER,
    pwr: process.env.PWR,
    cluster: process.env.CLUSTER,
    database: process.env.DATABASE,
};

module.exports = { config };
