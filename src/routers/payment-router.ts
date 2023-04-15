import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPaymentByTicketId, postPayment } from '@/controllers';
import { paymentSchema } from '@/schemas/payments-schema';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, getPaymentByTicketId);
paymentRouter.post('/process', authenticateToken, validateBody(paymentSchema), postPayment);

export { paymentRouter };
