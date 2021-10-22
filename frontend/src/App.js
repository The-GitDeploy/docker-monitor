import React, { useContext, useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ContainerGroup } from './ContainerGroup';
import { Sidebar } from './Sidebar';
import { SyncStateContext } from './SyncState';

function App() {

  const [version, setVersion] = useState(null)

  useEffect(() => {
    fetch((process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/version")
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed API call!")
        return response.json()
      }).then((response) => {
        if (response.error)
          throw new Error("Failed API call serverside!")
        setVersion(response)
        console.log(response)
      })
  }, [])

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
      {version &&
          <div className={styles.version}>
            {version.Os} | {version.Platform.Name} | {version.Version}
          </div>
        }
    </div>
  );
}

export default App;
