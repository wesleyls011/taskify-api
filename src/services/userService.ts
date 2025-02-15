import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class UserService{
    static async getAllUsers(){
        try{
            return await prisma.user.findMany();
        } catch (error){
            throw new Error ('Erro ao buscar usuarios: ' + error.message);
        }
    }

    static async getUserById(id: string){
        try{
            return await prisma.user.findUnique({
                where: {id},
            });
        } catch (error) {
            throw new Error ('Erro ao buscar usuario: ' + error.message);
        }
    }

    static async createUser(data: {name: string; email: string; password: string}){
        try{
            return await prisma.user.create({
                data,
            });
        } catch(error){
            throw new Error ('Erro ao criar usuario: ' + error.message);
        }
    }

    static async updateUser(id: string, data: Partial<{name: string; email: string; password: string}>){
        try{
            return await prisma.user.update({
                where: {id},
                data,
            });
        } catch(error){
            throw new Error ('Erro ao atualizar usuario: ' +error.message);
        }
    }

    static async deleteUser(id: string){
        try{
            return await prisma.user.delete({
                where: {id}
            });
        } catch(error){
            throw new Error ('Erro ao deletar usuario: ' +error.message);
        }
    }
}
