import { useContext } from 'react';
import styles from './Network.module.scss';
import { SyncStateContext } from './SyncState';

function Network() {

  const data = useContext(SyncStateContext)

  return (
    <div>

    </div>
  );
}

export default Network;
