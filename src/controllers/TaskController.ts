import type { Request, Response } from 'express';
import Project from '../models/Project.schema';
import Task from '../models/Task.schema';



export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await task.save();
            await req.project.save();
            res.send("Tarea creada correctamente");
 
        } catch (error) {
            //Asi no denetemos la ejecución durante producción
            res.status(500).json({error: "hubo un error"});    
        }
    }

    static getTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id});
            console.log(tasks)
        } catch (error) {
            res.status(500).json({error: "hubo un error"});    
        }
    }
}


//OPCION DEL TRY MAS ESPECIFICA CON UN OBJETO
            //   const taskData = {
            //     name: req.body.name,
            //     description: req.body.description,
            //     project: projectId, // Asegúrate de asignar el `projectId`
            //     status: req.body.status  // Usa el estado proporcionado o por defecto
            // };
            // const task = new Task(taskData);
            // await task.save();
            // res.send("Tarea creada correctamente");