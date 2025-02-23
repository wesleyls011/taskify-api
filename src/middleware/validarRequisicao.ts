import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const taskSchema = z.object({
    name: z.string().min(3, "O titulo da tarefa deve conter pelo menos 3 caracteres"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    userId: z.string().uuid("ID do usuario invalido"),
    });

export function validateTask(req: Request, res: Response, next: NextFunction){
    const result = taskSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({errors: result.error.format() });
    }

    next();
}