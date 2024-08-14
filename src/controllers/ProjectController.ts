import type { Request, Response } from 'express';
import Project from '../models/Project.schema';



//Usamos clases para exportar todo junto y no varias funciones
export class ProjectController {

    //Un método estático no requiere ser instanciado.   
    static createProjects = async (req: Request, res: Response) => {
        

        const project = new Project(req.body);


        try {
            //Otra opcion directamente asi: await Project.create(req.body)
            await project.save();
            res.send("Proyecto creado");
            console.log(project);
        } catch (error) {
            console.log(error);
        }

    }


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (error) {
            console.log(error)
        }
    }
}