import React, { useContext, useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Code } from './Code';
import { Controlboard } from './Controlboard';
import { Sidebar } from './Sidebar';
import { SyncStateContext } from './SyncState';

function App() {

  const syncState = useContext(SyncStateContext)

  const [selectedContainerId, setSelectedContainerId] = useState(null)

  const selectedContainer = selectedContainerId && syncState.containers && syncState.containers.find((c) => c.Id === selectedContainerId)

  return (
    <div className={styles.background} onClick={() => setSelectedContainerId(null)}>
      <div className={styles.listContainer}>
        {syncState.containers && syncState.containers.map(c => {
          return (
            <div key={c.Id} className={styles.dockerContainer} onClick={(e) => { e.stopPropagation(); setSelectedContainerId(c.Id) }}>
              <h3>{c.Names[0]}</h3>
              <div>
                <span>{c.Image}</span>
                <span>{c.Status}</span>
              </div>
            </div>)
        })}
      </div>
      {selectedContainer && (
        <Sidebar selectedContainer={selectedContainer} onClose={()=>setSelectedContainerId(null)} />
      )}
    </div>
  );
}

export default App;
