import { prisma } from '@/config';

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTypeId(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

export default { findTicketsType, findTypeId };
