import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketsTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketsTypes);

export { ticketsRouter };
