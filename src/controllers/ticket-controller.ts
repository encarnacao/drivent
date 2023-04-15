import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/ticket-service';

async function getTicketsTypes(_req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getAll();
    res.send(ticketsTypes);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getTicketsTypes };
