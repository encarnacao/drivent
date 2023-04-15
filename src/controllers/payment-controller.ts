import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';

async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    if (!ticketId) {
      throw { status: 400, message: 'No ticketId provided' };
    }
    const payment = await paymentService.findByTicketId(Number(ticketId));
    if (payment.Ticket.Enrollment.userId !== req.userId) {
      throw { status: 401, message: 'You are not authorized to view this payment' };
    }
    if (!payment) {
      throw { status: 404, message: 'No payment found' };
    }
    delete payment.Ticket;
    res.json(payment);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
}

export { getPaymentByTicketId };
