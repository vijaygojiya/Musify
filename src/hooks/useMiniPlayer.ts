import {useContext} from 'react';
import {MiniPlayerContext} from '../contexts/miniPlayerProvider';

export default function useMiniPlayer() {
  const context = useContext(MiniPlayerContext);
  if (!context) {
    throw new Error('userMiniPlayer must be used within a AppThemeProvider');
  }

  return context;
}
