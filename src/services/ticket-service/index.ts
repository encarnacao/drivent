import ticketsRepository from '@/repositories/ticket-repository';

export async function getAll() {
  const ticketsTypes = await ticketsRepository.findTicketsType();
  return ticketsTypes;
}

const ticketsService = {
  getAll,
};

export default ticketsService;
