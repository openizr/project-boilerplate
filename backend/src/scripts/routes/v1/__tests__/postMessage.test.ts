import postMessage from 'scripts/routes/v1/postMessage';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('fastify');
jest.useFakeTimers();

describe('routes/v1/postMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly handles request', async () => {
    const send = jest.fn();
    const promise = postMessage.handler({} as FastifyRequest, { send } as unknown as FastifyReply);
    jest.runAllTimers();
    await promise;
    expect(postMessage.schema).toMatchSnapshot();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith();
  });
});
