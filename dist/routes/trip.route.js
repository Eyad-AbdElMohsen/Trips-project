"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagination_1 = require("../utils/pagination");
const trip_controller_1 = require("../controllers/trip.controller");
const sorting_1 = require("../utils/sorting");
const trip_validator_1 = require("../validators/trip.validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const tripRouter = (0, express_1.Router)();
tripRouter.route('/')
    .get(trip_validator_1.getAllTripsValidation, validation_middleware_1.default, pagination_1.pagination, sorting_1.sorting, trip_controller_1.getAllTrips)
    .post(trip_validator_1.createTripValidator, validation_middleware_1.default, trip_controller_1.createTrip);
exports.default = tripRouter;
