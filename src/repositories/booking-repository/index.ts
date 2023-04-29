import { prisma } from '@/config';

async function findUserBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function updateBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      roomId,
    },
  });
}

async function findBookingById(id: number) {
  return prisma.booking.findFirst({
    where: { id },
  });
}

const bookingRepository = {
  findUserBooking,
  createBooking,
  updateBooking,
  findBookingById,
};

export default bookingRepository;
