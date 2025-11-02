"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
}
//# sourceMappingURL=error.middleware.js.map