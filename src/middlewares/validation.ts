//Necesitamos este middleware para continuar la validacion con express-validator.

import type {Request, Response, NextFunction} from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res:Response, next:NextFunction) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); //Convertimos en array para poder mostrar todos los errores cuando dos o mas campos esten vacíos
    }
    next();
}