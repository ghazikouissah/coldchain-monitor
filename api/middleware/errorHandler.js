const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method
    });
    res.status(err.statusCode || 500).json({
        message: err.message || "erreur serveur"
    });
  
};

module.exports = errorHandler;