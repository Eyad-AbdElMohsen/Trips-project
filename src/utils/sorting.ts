import { NextFunction, Request, response, Response } from "express";

export const sorting = (req: Request, res: Response, next: NextFunction) =>{
    let sort: string = String(req.query.sort)
    let queries = sort.split(',')
    req.query.sortingQueries = queries
    next()
}