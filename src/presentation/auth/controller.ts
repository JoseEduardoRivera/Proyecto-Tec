import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

    // Inyeccion de dependencias
    constructor(
        public readonly authService: AuthService,
    ){}

    //Controlar los errores de las peticiones
    private handleError = (error: unknown, res: Response ) => {
        // si el error existe en nuestros errores personalzados, regresarlo
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        // Si no, regresamos el error que no conocemos y por defecto mandamos 500
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
      } 

    // Controlador para registrar Usuario
    registerUser = (req:Request, res:Response) => {
        //Validar y crear DTO a partir de los datos de la solicitud
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) {
            return res.status(400).json({ error})
        }
        //LLama al servicio de autenticacion para registrar al usuario y si hay error regresamos el mensaje
        this.authService.registerUser(registerUserDto!)
        .then((user)=>res.json(user))
        .catch(error => this.handleError(error,res))
    }

    // Controlador para iniciar sesion
    loginUser = (req:Request, res:Response) => {
        res.json('LoginUser')
    }


    // controlador para validar email
    validateEmail = (req:Request, res:Response) => {
        res.json('ValidateEmail')
    }

}