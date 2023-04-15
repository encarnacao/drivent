import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { PaymentParams } from '@/schemas/payments-schema';
import { notFoundError, unauthorizedError } from '@/errors';

async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    if (!ticketId) {
      throw { name: 'BadRequestError', message: 'TicketId is required' };
    }
    const payment = await paymentService.findByTicketId(Number(ticketId));
    if (!payment) {
      throw notFoundError();
    }
    if (payment.Ticket.Enrollment.userId !== req.userId) {
      throw unauthorizedError();
    }
    delete payment.Ticket;
    res.json(payment);
  } catch (error) {
    console.log(error);
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    if (error.name === 'BadRequestError') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    res.sendStatus(500);
  }
}

async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const body = req.body as PaymentParams;
    const payment = await paymentService.insertPayment(body, userId);
    res.status(200).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    res.sendStatus(500);
  }
}

export { getPaymentByTicketId, postPayment };
