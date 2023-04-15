import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { PaymentParams } from '@/schemas/payments-schema';

async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const payment = await paymentService.findByTicketId(ticketId, req.userId);
    res.json(payment);
  } catch (error) {
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
