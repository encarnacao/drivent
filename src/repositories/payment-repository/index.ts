import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketId(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });

  return payment;
}

async function insertPayment(data: Prisma.PaymentCreateInput) {
  const payment = await prisma.payment.create({
    data,
  });
  return payment;
}

export default { findTicketId, insertPayment };
