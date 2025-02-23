import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(3, "O nome deve conter no minimo 3 caracteres"),
    email: z.string().email("Email invalido"),
    password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
});

export function validateUser(req: Request, res: Response, next: NextFunction){
    const result = userSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({errors: result.error.format() });
    }

    next();
}