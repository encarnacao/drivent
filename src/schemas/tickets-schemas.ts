import Joi from 'joi';

export const createTicketSchema = Joi.object<CreateTicketParams>({
  ticketTypeId: Joi.number().required(),
});

type CreateTicketParams = {
  ticketTypeId: number;
};
