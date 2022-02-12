/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 00:38:31 
 * @Last Modified by:   Wenhao FENG 
 * @Last Modified time: 2022-02-12 00:38:31 
 */
module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'helloevan'
};
