import { Booking } from '@prisma/client';
import Joi from 'joi';

export const bookingSchema = Joi.object<BookingBody>({
  roomId: Joi.number().required(),
});

type BookingBody = Pick<Booking, 'roomId'>;
