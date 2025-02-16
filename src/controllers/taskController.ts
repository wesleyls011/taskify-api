import { Request, Response } from 'express'
import { TaskService } from '../services/taskService'

export class TaskController{
    static async getAllTasks(req: Request, res: Response){
        try{
            const tasks = await TaskService.getAllTasks();
            res.status(200).json(tasks);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async getTaskById(req: Request, res: Response){
        try{
            const {id} = req.params;
            const task = await TaskService.getTaskById(id);
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({message: 'Tarefa nao encontrada'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async createTask(req: Request, res: Response){
        try{
            const {name, description, userId} = req.body;
            const newTask = await TaskService.createTask({name, description, userId});
            res.status(201).json({message: 'Tarefa criada com suceesso! ', task: newTask});
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async updateTask(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {name, description, completed, userId} = req.body;
            const updatedTask = await TaskService.updateTask(id, {name, description, completed, userId});
            if (updatedTask){
                res.status(200).json({message: 'Tarefa atualizada com sucesso! ', task: updatedTask});
            } else {
                res.status(404).json({message: 'Tarefa nao encontrada'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async deleteTask(req: Request, res: Response){
        try{
            const {id} = req.params;
            const deletedTask = await TaskService.deleteTask(id);
            if (deletedTask){
                res.status(200).json({message: 'Tarefa deletada com sucesso! ', task: deletedTask});
            } else {
                res.status(404).json({message: 'Tarefa nao encontrada'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }
}