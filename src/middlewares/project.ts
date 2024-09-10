import type {Request, Response, NextFunction} from 'express';
import Project, { IProject } from '../models/Project.schema';

//Con esto podemos reescribir el scope global en este caso del Request
//Usamos interface para no "sobreescribir" el Request, con Interface podemos agregar atributos y no reescribirlo. 
//Si usas dos interface con el mismo nombre, se agregan los tipos y no sale error de duplicado.
declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

//Es una función asíncrona porque consultamos a la base de datos si el proyecto existe
export async function validateProjectExist(req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId } = req.params;
    // console.log(req.body)
    //Validamos que exista el proyecto
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });

    //Aqui pasamos al request el proyecto para ser usado en el controlador si el proyecto existiera.
    req.project = project;
    next();

  } catch (error) {
    res.status(500).json({error: "hubo un error"});    
}
}