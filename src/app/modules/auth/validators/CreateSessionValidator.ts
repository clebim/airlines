import { errorMessages } from 'utils/ErrorMessages';
import * as yup from 'yup';

export const sessionSchemaValidator = yup.object().shape({
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),

  password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),
});
