import { Request, Response, NextFunction } from "express";
import { Trip, ITrip } from "../models/trip.model";
import { FilterQuery, PipelineStage } from 'mongoose';

type TripsQuery = {
    limit: string,
    skip: string;
    dateFrom?: string;
    dateTill?: string;
    sortingQueries: string[];
    deprature?: string;
    destination?: string;
}

export const getAllTrips = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            limit, skip, dateFrom, dateTill, deprature, destination, sortingQueries
        } = req.query as TripsQuery;

        const matches: FilterQuery<ITrip> = {};
        if(dateFrom)matches.startingDate = { $gte: new Date(dateFrom)}
        if(dateTill)matches.startingDate = { ...matches.startingDate, $lte: new Date(dateTill)}
        if(deprature)matches.deprature =  deprature;
        if(destination)matches.destination = destination;

        const sortConditions : Record <string, 1 | -1> = {}
        if (sortingQueries[0] != 'undefined') {
            for (let query of sortingQueries){
                let order: 1 | -1 = 1
                if(query.startsWith('-')){
                    order = -1
                }
                let queryName = query.replace('-', '')
                sortConditions[queryName]=  order
            }
        }

        const pipelines: PipelineStage[] = []
        if (Object.keys(matches).length > 0) {
            pipelines.push({ $match: matches }); 
        }

        if (Object.keys(sortConditions).length > 0) {
            pipelines.push({ $sort: sortConditions });
        }
        pipelines.push({ $skip: parseInt(skip)})
        pipelines.push({ $limit: parseInt(limit)})

        const trips = await Trip.aggregate(pipelines)

        res.json({
            status: 'SUCCESS',
            data: {trips}
        })
    }catch(err){
        next(err)
    }
}

export const createTrip = async(req: Request, res: Response, next: NextFunction) => {
    //deprature destination startDate duration passengers
    try{
        const newTrip = new Trip(req.body)
        await newTrip.save()
        res.json({
            status: 'SUCCESS',
            data: {newTrip}
        })
    }catch(err){
        console.log(err)
    }
}