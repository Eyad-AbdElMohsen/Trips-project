import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../errors/api.error";


const validationMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError('validation error ', 400, errors.array())
    }
    next()
    }catch(err){
        next(err)
    }
}
export default validationMiddleware