import { SyncedClient } from "express-sync-state"
import React, { useEffect, useState } from "react"

export const SyncStateContext = React.createContext({composed: {}, other: [], all:{}})

export function SyncStateProvider(props) {

  const [syncState, setSyncState] = useState({composed: {}, other: [], all:{}})

  useEffect(() => {
    SyncedClient((process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "")+"/state", (state) => {
      setSyncState(JSON.parse(JSON.stringify(state)))
    })
  }, [])

  return (
    <SyncStateContext.Provider value={syncState}>
      {props.children}
    </SyncStateContext.Provider>
  )

}
