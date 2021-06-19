import createSchema from 'scripts/helpers/createSchema';

describe('helpers/createSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('with body', async () => {
    expect(createSchema({ body: { required: ['test'] } })).toMatchSnapshot();
  });

  test('with query', async () => {
    expect(createSchema({ query: { required: ['test'] } })).toMatchSnapshot();
  });

  test('with params', async () => {
    expect(createSchema({ params: { required: ['test'] } })).toMatchSnapshot();
  });
});
