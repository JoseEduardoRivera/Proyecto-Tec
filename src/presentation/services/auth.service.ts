// El servicio sera el encargado de interactuar con la base de datos

import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { PrismaClient } from "@prisma/client";
 
// Instancia de prisma para interactuar con la base de datos
const prisma = new PrismaClient()


export class AuthService {

    // Inyeccion de dependencias
    constructor(){}

    // Metodo para registrar un usuario en la base de datos
    public async registerUser(registerUserDto: RegisterUserDto){

        // Verificar si hay un usuario con el mismo correo electronico
        const existUser = await prisma.user.findUnique({
            where:{
                email: registerUserDto.email
            }
        })

        // Si hay dos correos iguales, lanza un error
        if (existUser) {
            throw CustomError.badRequest('Email already registered')
        }

        try {

            const user  = await prisma.user.create({
                data:{
                    ...registerUserDto
                },
                // select:{
                //     id:true,
                //     name:true,
                //     email:true,
                //     emailValidated:true,
                //     role:true,
                //     img:true
                // }
            })

            // Encriptar la contraseña

            // Generar JWT para autenticar el usuario

            // Email de confirmacion


            const {password, ...userEntity} = UserEntity.fromObject(user);

            return {
                user:userEntity,
                token:'ABC'
            };

            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }
}
