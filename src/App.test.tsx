import { act, renderHook } from '@testing-library/react-hooks';
import { useReducer } from 'react';
import { globalReducer, initialState } from './contexts';

describe('Global context', () => {
  it('should change current page', async () => {
    const { result } = renderHook(() => useReducer(globalReducer, initialState));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({ currentPage: 3 });
    });
    const [newState] = result.current;
    expect(newState.currentPage).toBe(3);
  });

  it('should change current page and filters', async () => {
    const { result } = renderHook(() => useReducer(globalReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ currentPage: 5 });
    });
    const [stateWithNeCurrentPage] = result.current;
    expect(stateWithNeCurrentPage.currentPage).toBe(5);

    act(() => {
      dispatch({ filters: { manufacturer: 'Fiat', color: 'white' } });
    });

    const [newState] = result.current;
    expect(newState.filters && newState.filters.manufacturer).toBe('Fiat');
    act(() => {
      dispatch({ filters: { manufacturer: '', color: 'yellow' } });
    });

    const [anotherState] = result.current;
    expect(anotherState.filters && anotherState.filters.manufacturer).toBe('');
    expect(anotherState.filters && anotherState.filters.color).toBe('yellow');
  });
});
