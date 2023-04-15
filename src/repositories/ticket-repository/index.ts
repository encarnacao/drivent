import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getUserTicket(userId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
  return ticket;
}

async function insertTicket(data: Prisma.TicketCreateInput) {
  const ticket = await prisma.ticket.create({
    data: data,
    include: {
      TicketType: true,
    },
  });
  return ticket;
}

async function findTicketId(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: {
        select: {
          userId: true,
        },
      },
      TicketType: true,
    },
  });
  return ticket;
}

async function updateTicketStatus(ticketId: number) {
  const ticket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
  return ticket;
}

export default { getUserTicket, insertTicket, findTicketId, updateTicketStatus };
