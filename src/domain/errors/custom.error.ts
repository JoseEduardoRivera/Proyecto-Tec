

export class CustomError extends Error {

    constructor(
        //propiedades
        public readonly statusCode: number,
        public readonly message: string
    ){
        //llamar constructor
        super(message);
    }

    //metodos personalizados de errores

    //BadRequest - El body de la peticion es incorrecto
    static badRequest(message: string): CustomError {
        return new CustomError(400, message);
    }

    //No se cuenta con el token de autorizacion
    static unAuthorized(message: string): CustomError {
        return new CustomError(401, message);
    }

    //falta de permisos necesarios en la solicitud
    static Forbiden(message: string): CustomError {
        return new CustomError(403, message);
    }

    //no se han encontrado registros
    static notFound(message: string): CustomError {
        return new CustomError(404, message);
    }

    //error interno del servidor
    static internalServer(message: string): CustomError {
        return new CustomError(500, message);
    }
}