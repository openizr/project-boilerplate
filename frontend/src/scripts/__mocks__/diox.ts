/**
 * Diox mock.
 */
export default function Store(): Record<string, jest.Mock> {
  return {
    register: jest.fn(),
    mutate: jest.fn(),
    dispatch: jest.fn(),
  };
}
