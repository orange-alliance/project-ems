import { MatchState } from '@toa-lib/models';
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { matchStateAtom } from 'src/stores/NewRecoil';

const UnloadEffect: FC = () => {
  const state = useRecoilValue(matchStateAtom);

  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  const onUnload = (e: BeforeUnloadEvent) => {
    if (state >= MatchState.PRESTART_COMPLETE) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  return null;
};

export default UnloadEffect;
