import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class TaskService{
    static async getAllTasks(){
        try{
            return await prisma.task.findMany();
        } catch(error){
            throw new Error ('Erro ao buscar tarefas: ' + error.message);
        }
    }

    static async getTaskById(id: string){
        try{
            return await prisma.task.findUnique({
                where: {id}
            });
        } catch(error){
            throw new Error ('Erro ao buscar tarefa: ' + error.message);
        }
    }

    static async createTask(data: {name: string; description: string; completed: boolean; userId: string}){
        try{
            return await prisma.task.create({
                data,
            });
        } catch(error){
            throw new Error ('Erro ao criar tarefa: ' + error.message);
        }
    }

    static async updateTask(id: string, data: Partial<{name: string; description: string; completed: boolean; userId: string}>){
        try{
            return await prisma.task.update({
                where: {id},
                data,
            });
        } catch(error){
            throw new Error ('Erro ao atualizar tarefa: ' + error.message);
        }
    }

    static async deleteTask(id: string){
        try{
            return await prisma.task.delete({
                where: {id},
            });
        } catch(error){
            throw new Error ('Erro ao deletar tarefa: ' + error.message);
        }
    }
}