import { Response } from 'express';
import httpStatus from 'http-status';
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

async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const ticket = await ticketsService.getUserTicket(userId);
    res.send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.sendStatus(500);
  }
}

async function postTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const ticketTypeId = Number(req.body.ticketTypeId);
    const ticket = await ticketsService.insertTicket(userId, ticketTypeId);
    res.status(201).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.sendStatus(500);
  }
}

export { getTicketsTypes, getTickets, postTicket };
