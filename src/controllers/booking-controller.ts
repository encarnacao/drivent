import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const booking = await bookingService.findUserBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;
  try {
    const booking = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
    }
    if (err.name === 'ForbiddenError') {
      return res.status(httpStatus.FORBIDDEN).send({ message: err.message });
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const bookingId = Number(req.params.id);
  const roomId = req.body.roomId as number;
  if (isNaN(bookingId)) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const booking = await bookingService.updateBooking(bookingId, userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
    }
    if (err.name === 'ForbiddenError') {
      return res.status(httpStatus.FORBIDDEN).send({ message: err.message });
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
