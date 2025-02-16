import { Request, Response} from 'express';
import { UserService } from '../services/userService';

export class UserController{
    static async getAllUsers(req: Request, res: Response){
        try{
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async getUserById(req: Request, res: Response){
        try{
            const {id} = req.params;
            const user = await UserService.getUserById(id);
            if (user){
                res.status(200).json(user);
            } else {
                res.status(404).json({message: 'Usuario nao encontrado'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async createUser(req: Request, res: Response){
        try{
            const {name, email, password} = req.body;
            const newUser = await UserService.createUser({name, email, password});
            res.status(201).json({message: 'Usuario criado com sucesso! ', user: newUser});
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async updateUser(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {name, email, password} = req.body;
            const updatedUser = await UserService.updateUser(id, {name, email, password});
            if (updatedUser){
                res.status(200).json({message: 'Usuario atualizado com sucesso! ', user: updatedUser});
            } else {
                res.status(404).json({message: 'Usuario nao encontrado'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static async deleteUser(req: Request, res: Response){
        try{
            const {id} = req.params;
            const deletedUser = await UserService.deleteUser(id);
            if(deletedUser){
                res.status(200).json({message: 'Usuario deletado com sucesso! ' +deletedUser});
            } else {
                res.status(404).json({message: 'Usuario nao encontrado'});
            }
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }
}