import * as yup from 'yup';
import { errorMessages } from '../../../../utils/ErrorMessages';

export const companySchemaValidator = yup.object().shape({
  name: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),

  fantasy_name: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  confirmation_password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  cnpj: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),
});
