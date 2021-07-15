import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFavourite } from './useFavourite';

interface MockLocalStorage {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => boolean;
  clear: () => void;
}

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStorage = (): MockLocalStorage => {
  let storage: any = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => { storage[key] = value || ''; },
    removeItem: (key: string) => delete storage[key],
    clear: (): void => { storage = {}; },
  };
};

Object.defineProperty(window, 'localStorage', { value: mockStorage() });

describe('useFavorite hook', () => {
  it('should return data set in favorites and then clear it on the second call', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        car: {
          stockNumber: 100,
          data: 'somedata',
        },
      },
    }));

    const { result, waitForNextUpdate } = renderHook(() => useFavourite());

    act(() => result.current.setFavourite(100));
    await waitForNextUpdate();
    expect(result.current.getFavourites()).toEqual([
      { stockNumber: 100, data: 'somedata' },
    ]);

    act(() => result.current.setFavourite(100));
    expect(result.current.getFavourites()).toEqual([]);
  });
});
