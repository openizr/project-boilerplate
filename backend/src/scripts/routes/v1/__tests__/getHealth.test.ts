import getHealth from 'scripts/routes/getHealth';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('fastify');

describe('routes/getHealth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly handles request', () => {
    const send = jest.fn();
    getHealth.handler({} as FastifyRequest, { send } as unknown as FastifyReply);
    expect(getHealth.schema).toMatchSnapshot();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith();
  });
});
