import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { SyncStateContext } from './SyncStateContext';
import { SyncedClient } from 'express-sync-state'

function App() {

  const [syncState, setSyncState] = useState({});

  useEffect(() => {
    SyncedClient("/state", (state) => {
      setSyncState({...state})
    })
  }, [])


  return (
    <SyncStateContext.Provider value={syncState}>
      <div className={styles.background}>
        <div className={styles.listContainer}>
        {syncState.containers && syncState.containers.map(c => {
          return (
            <div className={styles.dockerContainer}>
              <h3>{c.Names[0]}</h3>
              <span>{c.Image}</span>
              <span>{c.Status}</span>
            </div>)
        })}
        </div>
      </div>
        
    </SyncStateContext.Provider>
  );
}

export default App;
