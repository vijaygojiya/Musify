import {useContext} from 'react';
import {GlobalContext} from '@/contexts/globalProvider';

export default function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a Global Provider!');
  }

  return context;
}
