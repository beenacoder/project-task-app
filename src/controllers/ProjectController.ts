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

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const oneProject = await Project.findById(req.params.id);
            if (!oneProject) return res.status(404).json({ msg: "Proyecto no encontrado" });
            res.json(oneProject);
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
           const project = await Project.findByIdAndUpdate(id, req.body);
           if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });
           await project.save();
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            // const project = await Project.findByIdAndDelete(req.params.id);

            //ésta manera es mejor porque podemos usar validaciones de usuario entre otras
            const project = await Project.findByIdAndDelete(req.params.id);
            
            if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });
            await project.deleteOne();
            res.send("Proyecto Eliminado");
        } catch (error) {
            console.log(error)
        }
    }

}