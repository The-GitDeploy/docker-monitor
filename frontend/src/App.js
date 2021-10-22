import { useContext, useState } from 'react';
import styles from './App.module.scss';
import { SyncStateContext } from './SyncState';

function App() {

  const syncState = useContext(SyncStateContext)

  const [selectedContainerId, setSelectedContainerId] = useState(null)

  const selectedContainer = selectedContainerId && syncState.containers && syncState.containers.find((c) => c.Id = selectedContainerId)

  return (
    <div className={styles.background} onClick={() => setSelectedContainerId(null)}>
      <div className={styles.listContainer}>
        {syncState.containers && syncState.containers.map(c => {
          return (
            <div key={c.Names[0]} className={styles.dockerContainer} onClick={(e) => { e.stopPropagation(); setSelectedContainerId(c.Id) }}>
              <h3>{c.Names[0]}</h3>
              <span>{c.Image}</span>
              <span>{c.Status}</span>
            </div>)
        })}
      </div>
      {selectedContainer && (
        <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSelectedContainerId(null)}>X</button>
          <h1>{selectedContainer.Names[0]}</h1>
          {selectedContainer.Names.length > 0 && (
            <h2>{selectedContainer.Names.map((name, index) => index > 1 ? name : '')} </h2>
          )}
          <textarea disabled value={JSON.stringify(selectedContainer, null, 2)} className={styles.code}/>
        </div>
      )}
    </div>
  );
}

export default App;
