import * as yup from 'yup';
import { errorMessages } from '../../../../utils/ErrorMessages';

export const ticketSchemaValidator = yup.object().shape({
  passengerName: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  birthDate: yup
    .date()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  flightId: yup
    .number()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  flightDate: yup
    .date()
    .required(errorMessages.required)
    .typeError(errorMessages.type),
});
