"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrip = exports.getAllTrips = void 0;
const trip_model_1 = require("../models/trip.model");
const getAllTrips = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, dateFrom, dateTill, deprature, destination, sortingQueries } = req.query;
        const matches = {};
        if (dateFrom)
            matches.startingDate = { $gte: new Date(dateFrom) };
        if (dateTill)
            matches.startingDate = Object.assign(Object.assign({}, matches.startingDate), { $lte: new Date(dateTill) });
        if (deprature)
            matches.deprature = deprature;
        if (destination)
            matches.destination = destination;
        const sortConditions = {};
        if (sortingQueries[0] != 'undefined') {
            for (let query of sortingQueries) {
                let order = 1;
                if (query.startsWith('-')) {
                    order = -1;
                }
                let queryName = query.replace('-', '');
                sortConditions[queryName] = order;
            }
        }
        const pipelines = [];
        if (Object.keys(matches).length > 0) {
            pipelines.push({ $match: matches });
        }
        if (Object.keys(sortConditions).length > 0) {
            pipelines.push({ $sort: sortConditions });
        }
        pipelines.push({ $skip: parseInt(skip) });
        pipelines.push({ $limit: parseInt(limit) });
        const trips = yield trip_model_1.Trip.aggregate(pipelines);
        res.json({
            status: 'SUCCESS',
            data: { trips }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTrips = getAllTrips;
const createTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //deprature destination startDate duration passengers
    try {
        const newTrip = new trip_model_1.Trip(req.body);
        yield newTrip.save();
        res.json({
            status: 'SUCCESS',
            data: { newTrip }
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createTrip = createTrip;
