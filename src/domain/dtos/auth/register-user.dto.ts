/* 
DTO (DATA-TRANSFER-OBJECT)
Estructura y transfiere datos de manera eficiente entre diferentes compponetes
de mi proyecto, promueve una claridad de los datos
*/

import { regularExps } from "../../../config";

// Definicion de la clase DTO para registrar usuarios
export class RegisterUserDto {
    constructor(
        //propiedades requeridas para crear un usuario
        public readonly name:string,
        public readonly email:string,
        public readonly password:string
    ){}


    //metodo estatico para crear una instancia de RegisteruserDto a partir de un objecto
    static create(object: {[key:string]:any}): [string?,RegisterUserDto?] {
        // Desestructuracion del objeto para acceder a las propiedades
        const {name, email, password} = object;

        //validaciones de los datos del usuario
        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6 ) return ['Password too short'];

        // Crear instancia de RegisterUserDto si las validaciones pasan
        return [undefined, new RegisterUserDto(name, email, password)]
    }
}