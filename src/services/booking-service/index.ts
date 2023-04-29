import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/rooms-repository';

async function checkRoom(roomId: number) {
  const room = await roomRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.Booking.length === room.capacity) {
    throw forbiddenError('Room is full');
  }
}

async function checkBooking(bookingId: number, userId: number) {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) {
    throw notFoundError();
  }
  if (booking.userId !== userId) {
    throw forbiddenError('You are not allowed to do this');
  }
}

export async function findUserBooking(userId: number) {
  const booking = await bookingRepository.findUserBooking(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

export async function createBooking(userId: number, roomId: number) {
  await checkRoom(roomId);
  const booking = await bookingRepository.createBooking(userId, roomId);
  return booking;
}

export async function updateBooking(id: number, userId: number, roomId: number) {
  await checkBooking(id, userId);
  await checkRoom(roomId);
  const booking = await bookingRepository.updateBooking(id, roomId);
  return booking;
}

const bookingService = {
  findUserBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
