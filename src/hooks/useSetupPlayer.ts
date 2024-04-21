import TrackPlayer from 'react-native-track-player';
import {SetupService} from '../services';
import {useEffect, useState} from 'react';

export default function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) {
        return;
      }
      setPlayerReady(true);
      const queue = await TrackPlayer.getQueue();
      if (unmounted) {
        return;
      }
      if (queue.length <= 0) {
        // await QueueInitialTracksService();
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}
