import postMessage from 'scripts/routes/v1/postMessage';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('fastify');

describe('routes/v1/postMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly handles request', () => {
    const send = jest.fn();
    postMessage.handler({} as FastifyRequest, { send } as unknown as FastifyReply);
    expect(postMessage.schema).toMatchSnapshot();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith();
  });
});
