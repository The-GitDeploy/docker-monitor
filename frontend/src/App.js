import React, { useContext, useState } from 'react';
import styles from './App.module.scss';
import { ContainerGroup } from './ContainerGroup';
import { Sidebar } from './Sidebar';
import { SyncStateContext } from './SyncState';

function App() {

  const syncState = useContext(SyncStateContext)

  const [selectedContainerId, setSelectedContainerId] = useState(null)

  const selectedContainer = selectedContainerId && syncState.all[selectedContainerId]
  if (!selectedContainer && selectedContainerId)
    setSelectedContainerId(null)

  return (
    <div className={styles.background} onClick={() => setSelectedContainerId(null)}>
      <div className={styles.listWrapper}>
        {
          Object.keys(syncState.composed).map((project) => {
            return (
              <ContainerGroup containers={syncState.composed[project]} setSelectedContainerId={setSelectedContainerId} project={project} key={project} />
            )
          })
        }
        {
          syncState.other.length > 0 &&
          <ContainerGroup containers={syncState.other} setSelectedContainerId={setSelectedContainerId} project="Non-composed containers" />
        }
      </div>
      {selectedContainer && (
        <Sidebar selectedContainer={selectedContainer} onClose={() => setSelectedContainerId(null)} />
      )}
    </div>
  );
}

export default App;
