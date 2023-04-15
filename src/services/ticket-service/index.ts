import ticketsRepository from '@/repositories/ticket-repository';

export async function getTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findTicketsType();
  return ticketsTypes;
}

const ticketsService = {
  getTicketsTypes,
};

export default ticketsService;
