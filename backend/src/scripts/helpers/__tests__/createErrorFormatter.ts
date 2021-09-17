import createErrorFormatter from 'scripts/helpers/createErrorFormatter';

describe('helpers/createErrorFormatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generates a correct BadRequest error - "required" keyword', () => {
    expect(createErrorFormatter()([{
      message: '',
      keyword: 'required',
      instancePath: '/test',
      params: { missingProperty: 'prop' },
    }], 'body')).toEqual(new Error('Request\'s body.test.prop is required.'));
    expect(createErrorFormatter()([{
      message: '',
      keyword: 'required',
      instancePath: '/test',
    }], 'body')).toEqual(new Error('Request\'s body.test.undefined is required.'));
  });

  test('generates a correct BadRequest error - other keyword', () => {
    expect(createErrorFormatter()([{
      message: 'must be a valid prop.',
      instancePath: '/test/prop',
    }], 'body')).toEqual(new Error('Request\'s body.test.prop must be a valid prop.'));
  });
});
