import { Prisma } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { PaymentParams } from '@/schemas/payments-schema';

async function findByTicketId(ticketId: number) {
  const payment = await paymentRepository.findTicketId(ticketId);
  return payment;
}

async function insertPayment(body: PaymentParams, userId: number) {
  const { ticketId, cardData } = body;
  const lastDigits = cardData.number.toString().slice(-4);
  const ticket = await ticketRepository.findTicketId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const data: Prisma.PaymentCreateInput = {
    Ticket: {
      connect: {
        id: ticketId,
      },
    },
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: lastDigits,
  };
  const payment = await paymentRepository.insertPayment(data);
  await ticketRepository.updateTicketStatus(ticketId);
  return payment;
}

const paymentService = {
  findByTicketId,
  insertPayment,
};

export default paymentService;
