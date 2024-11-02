import {body, query} from 'express-validator'

export const createTripValidator = [
    //deprature destination startDate duration passengers
    body('deprature')
        .isString().withMessage('deprature should be string')
        .isLength({min: 3}).withMessage('deprature should be at least 3 chars'),

    body('destination')
        .isString().withMessage('destination should be string')
        .isLength({min: 3}).withMessage('destination should be at least 3 chars'),
    
    body('startingDate')
        .isISO8601().withMessage('starting date should be in this form YYYY-MM-DD'),

    body('passengers')
        .isInt({min: 2}).withMessage('passengers should be number greater than 1')

]

export const getAllTripsValidation = [
    //deprature destination startDate duration passengers
    query('dateFrom')
        .optional()
        .isISO8601().withMessage('dateFrom should be in this form YYYY-MM-DD'),

    query('dateTill')
        .optional()
        .isISO8601().withMessage('dateTill should be in this form YYYY-MM-DD'),

    query('page')
        .optional()
        .isInt({min: 1}).withMessage('page should be number greater than 0'),

    query('limit')
        .optional()
        .isInt({min: 1}).withMessage('limit should be number greater than 0'),

]