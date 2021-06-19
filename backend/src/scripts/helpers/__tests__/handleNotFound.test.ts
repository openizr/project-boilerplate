import { FastifyRequest, FastifyReply } from 'fastify';
import handleNotFound from 'scripts/helpers/handleNotFound';

const send = jest.fn();
const request = {} as FastifyRequest;
const status = jest.fn(() => ({ send }));
const response = { status } as unknown as FastifyReply;

describe('helpers/handleNotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly handles not found errors', async () => {
    await handleNotFound(request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'not_found', message: 'Not Found.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(404);
  });
});
