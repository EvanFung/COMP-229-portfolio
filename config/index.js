/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 00:38:31 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-17 23:33:54
 */
require('dotenv').config();

module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'helloevan',
    mongoURI: process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/portfolio'
};
