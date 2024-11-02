import { Router } from 'express';
import { pagination } from '../utils/pagination';
import { createTrip, getAllTrips } from '../controllers/trip.controller';
import { sorting } from '../utils/sorting';
import { getAllTripsValidation,createTripValidator } from '../validators/trip.validator';
import validationMiddleware from '../middlewares/validation.middleware';


const tripRouter = Router()

tripRouter.route('/')
            .get(getAllTripsValidation,validationMiddleware, pagination, sorting, getAllTrips)
            .post(createTripValidator, validationMiddleware, createTrip)

export default tripRouter