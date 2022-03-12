import formatError from 'scripts/helpers/formatError';

describe('helpers/formatError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generates a correct BadRequest error - "required" keyword', () => {
    expect(formatError([{
      message: '',
      keyword: 'required',
      instancePath: '/test',
      params: { missingProperty: 'prop' },
    }], 'body')).toEqual(new Error('Request\'s body.test.prop is required.'));
    expect(formatError([{
      message: '',
      keyword: 'required',
      instancePath: '/test',
    }], 'body')).toEqual(new Error('Request\'s body.test.undefined is required.'));
  });

  test('generates a correct BadRequest error - other keyword', () => {
    expect(formatError([{
      message: 'must be a valid prop.',
      instancePath: '/test/prop',
    }], 'body')).toEqual(new Error('Request\'s body.test.prop must be a valid prop.'));
  });
});
