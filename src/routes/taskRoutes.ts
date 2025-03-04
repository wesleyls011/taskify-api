import { Router } from 'express';
import {TaskService} from "../services/taskService"

const router = Router();


router.post("/", TaskService.createTask);

router.get("/", TaskService.getAllTasks);

router.get("/:id", TaskService.getTaskById);

router.put("/:id", TaskService.updateTask);

router.delete("/:id", TaskService.deleteTask);

export default router;
