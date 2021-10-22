import React, { useContext, useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Code } from './Code';
import { Controlboard } from './Controlboard';
import { SyncStateContext } from './SyncState';

function App() {

  const syncState = useContext(SyncStateContext)

  const [selectedContainerId, setSelectedContainerId] = useState(null)

  const selectedContainer = selectedContainerId && syncState.containers && syncState.containers.find((c) => c.Id === selectedContainerId)

  const [log, setLog] = useState("");

  useEffect(() => {
    if (selectedContainerId) {

      let xhr = new XMLHttpRequest();
      let cancelled = false;
      xhr.open("GET",(process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/log/" + selectedContainerId);

      xhr.onprogress = event => {
        if (!cancelled)
          setLog(xhr.responseText.replaceAll(/\u0001|\u0002|\u0010|\u0012|\u0013|\u0014|\u0015|\u0016|\u001b/g, ''))
      };

      xhr.send();
      return () => {
        cancelled = true;
        xhr.abort()
        setLog("")
      }
    }

  }, [selectedContainerId])

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
        <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSelectedContainerId(null)}>X</button>
          <h1>{selectedContainer.Names[0]}</h1>
          {selectedContainer.Names.length > 0 && (
            <h2>{selectedContainer.Names.map((name, index) => index > 1 ? name : '')} </h2>
          )}
          <Controlboard containerId={selectedContainerId}/>
          <Code value={JSON.stringify(selectedContainer, null, 2)} />
          <h1>Log:</h1>
          <Code value={log} scrollToBottom/>
        </div>
      )}
    </div>
  );
}

export default App;
