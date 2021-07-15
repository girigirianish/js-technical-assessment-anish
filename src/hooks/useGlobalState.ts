import { useContext } from 'react';
import { GlobalContext } from '../contexts';
import { GlobalProviderContext } from '../models';

export function useGlobalState(): GlobalProviderContext {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No context available');
  }
  return context;
}
