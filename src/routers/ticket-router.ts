import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTickets, getTicketsTypes, postTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketsTypes);
ticketsRouter.get('/', authenticateToken, getTickets);
ticketsRouter.post('/', authenticateToken, validateBody(createTicketSchema), postTicket);

export { ticketsRouter };
