import paymentRepository from '@/repositories/payment-repository';

async function findByTicketId(ticketId: number) {
  const payment = await paymentRepository.findTicketId(ticketId);
  return payment;
}

const paymentService = {
  findByTicketId,
};

export default paymentService;
