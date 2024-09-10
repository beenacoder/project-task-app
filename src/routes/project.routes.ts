import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middlewares/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExist } from '../middlewares/project';
//Con los métodos estáticos solo tenemos que importar el controlador




const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage("El nombre del proyecto es obligatorio, por favor ingresa un nombre."),
    body('clientName')
        .notEmpty().withMessage("El nombre del cliente es obligatorio, por favor ingresa un nombre."),
    body('description')
        .notEmpty().withMessage("La descripción es obligatoria, por favor ingresa una descripción."),
    handleInputErrors, //middleware reutilizable, si pasa la validación que entre al controlador, sino lanza el middleware
    ProjectController.createProjects);

router.get('/', ProjectController.getAllProjects);


router.get('/:id',
    param('id').isMongoId().withMessage("El id del proyecto no es valido."),
    handleInputErrors,
    ProjectController.getProjectById);

router.put('/:id',
    param('id').isMongoId().withMessage("El id del proyecto no es valido."),
    body('projectName')
        .notEmpty().withMessage("El nombre del proyecto es obligatorio, por favor ingresa un nombre."),
    body('clientName')
        .notEmpty().withMessage("El nombre del cliente es obligatorio, por favor ingresa un nombre."),
    body('description')
        .notEmpty().withMessage("La descripción es obligatoria, por favor ingresa una descripción."),
    handleInputErrors,
    ProjectController.updateProject);

    router.delete('/:id',
        param('id').isMongoId().withMessage("El id del proyecto no es valido."),
        handleInputErrors,
        ProjectController.deleteProject);


// Rutas de tareas
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage("El nombre de la tarea es obligatorio, por favor ingresa un nombre."),
    body('description')
        .notEmpty().withMessage("La descripción de la tarea es obligatorio, por favor ingresa un nombre."),
    validateProjectExist,
    TaskController.createTask
)


router.get('/:projectId/tasks', 
    validateProjectExist, //Validamos antes para poder acceder al id del proyecto en el controlador
    TaskController.getTasks
)

export default router;