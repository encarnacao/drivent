import { Prisma } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/ticket-repository';
import ticketTypeRepository from '@/repositories/tickettype-repository';

export async function getAll() {
  const ticketsTypes = await ticketTypeRepository.findTicketsType();
  return ticketsTypes;
}

export async function getUserTicket(userId: number) {
  const ticket = await ticketsRepository.getUserTicket(userId);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

export async function insertTicket(userId: number, ticketTypeId: number) {
  const ticketType = await ticketTypeRepository.findTypeId(ticketTypeId);
  const enrollment = await enrollmentRepository.getEnrollmentId(userId);
  if (!ticketType || !enrollment) {
    throw notFoundError();
  }
  const data: Prisma.TicketCreateInput = {
    TicketType: {
      connect: { id: ticketTypeId },
    },
    Enrollment: {
      connect: { id: enrollment.id },
    },
    status: 'RESERVED',
  };
  const ticket = await ticketsRepository.insertTicket(data);
  return ticket;
}

const ticketsService = {
  getAll,
  getUserTicket,
  insertTicket,
};

export default ticketsService;
