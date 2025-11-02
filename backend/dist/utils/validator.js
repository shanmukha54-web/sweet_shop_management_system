"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireFields = requireFields;
// small helpers; keep simple
function requireFields(obj, fields) {
    for (const f of fields) {
        if (obj[f] === undefined || obj[f] === null)
            throw { statusCode: 400, message: `Missing field ${f}` };
    }
}
//# sourceMappingURL=validator.js.map