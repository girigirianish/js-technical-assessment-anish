import { createContext, useReducer, ReactNode } from 'react';
import { GlobalContextState, GlobalProviderContext } from '../models';

export const initialState: GlobalContextState = {
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  currentPage: 1,
  filters: { manufacturer: '', color: '' },
  manufacturers: [],
  colors: [],
};

export const GlobalContext = createContext<GlobalProviderContext>({
  state: initialState,
  // here we need console for developers
  // eslint-disable-next-line no-console
  dispatch: () => console.info('No provider registered yet !'),
});

export const globalReducer = (
  previousValue: GlobalContextState,
  newValue: GlobalContextState,
): GlobalContextState => ({ ...previousValue, ...newValue });

const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
