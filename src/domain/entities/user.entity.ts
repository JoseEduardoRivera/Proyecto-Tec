import { CustomError } from "../errors/custom.error";

export class UserEntity {


    constructor(
        //propiedades publicas para acceder a ellas desde cualquier parte de el proyecto
        public id:string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ){}

    //Metodo para verificar el orden correcto de la creacion de el usuario
    static fromObject(object: {[key: string]: any}){
        const {id, name, email, emailValidated, password, role, img } = object;
        
        if (!id)  {
            throw CustomError.badRequest('Missing Id');
        }
        if (!name) {
            throw CustomError.badRequest('Missing Name');
        }
        if (!email) {
            throw CustomError.badRequest('Missing Email');
        }
        if(emailValidated === undefined) throw CustomError.badRequest('Missing Email Validated');
        if (!password) {
            throw CustomError.badRequest('Missing Password');
        }
        if (!role) {
            throw CustomError.badRequest('Missing Role');
        }

        return new UserEntity(
            id,
            name,
            email,
            emailValidated,
            password,
            role,
            img
        );
    }


}