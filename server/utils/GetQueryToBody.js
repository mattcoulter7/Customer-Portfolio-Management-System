module.exports = () => {
    return async (req, res, next) => {
        req.body = {
            ...req.body || {},
            ...req.query || {}
        }
        next();
    }
};