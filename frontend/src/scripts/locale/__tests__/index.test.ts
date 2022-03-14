import loadLocale from 'scripts/locale/index';

describe('scripts/locale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly load locale', async () => {
    const locale = await loadLocale();
    expect(locale).toEqual({ LABEL_TEST: 'Hello World!' });
  });
});
