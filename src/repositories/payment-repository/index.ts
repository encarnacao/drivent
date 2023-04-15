import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketId(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId,
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
      Ticket: {
        select: {
          Enrollment: {
            select: {
              userId: true,
            },
          },
        },
      },
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
