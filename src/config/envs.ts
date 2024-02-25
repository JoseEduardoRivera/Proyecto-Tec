import 'dotenv/config';
import { get } from 'env-var';

//Variables de entorno necesarias para el funcionamiento correcto de la API
export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),

}



