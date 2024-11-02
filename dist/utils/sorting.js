"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorting = void 0;
const sorting = (req, res, next) => {
    let sort = String(req.query.sort);
    let queries = sort.split(',');
    req.query.sortingQueries = queries;
    next();
};
exports.sorting = sorting;
