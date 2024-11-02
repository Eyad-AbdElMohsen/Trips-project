"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTripsValidation = exports.createTripValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createTripValidator = [
    //deprature destination startDate duration passengers
    (0, express_validator_1.body)('deprature')
        .isString().withMessage('deprature should be string')
        .isLength({ min: 3 }).withMessage('deprature should be at least 3 chars'),
    (0, express_validator_1.body)('destination')
        .isString().withMessage('destination should be string')
        .isLength({ min: 3 }).withMessage('destination should be at least 3 chars'),
    (0, express_validator_1.body)('startingDate')
        .isISO8601().withMessage('starting date should be in this form YYYY-MM-DD'),
    (0, express_validator_1.body)('passengers')
        .isInt({ min: 2 }).withMessage('passengers should be number greater than 1')
];
exports.getAllTripsValidation = [
    //deprature destination startDate duration passengers
    (0, express_validator_1.query)('dateFrom')
        .optional()
        .isISO8601().withMessage('dateFrom should be in this form YYYY-MM-DD'),
    (0, express_validator_1.query)('dateTill')
        .optional()
        .isISO8601().withMessage('dateTill should be in this form YYYY-MM-DD'),
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 }).withMessage('page should be number greater than 0'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('limit should be number greater than 0'),
];
