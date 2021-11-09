import { useEffect, useState } from "react";
import { Code } from "./Code"
import { Controlboard } from "./Controlboard"
import styles from "./Sidebar.module.scss"

export const Sidebar = ({ selectedContainer, onClose }) => {
  const [log, setLog] = useState("")
  const [logValidId, setLogValidId] = useState(0)

  const invalidateLog = () =>{
    setLogValidId(logValidId => logValidId+1)
  }

  useEffect(() => {
    let xhr = new XMLHttpRequest()
    let cancelled = false
    xhr.open("GET", (process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/log/" + selectedContainer.Id)

    xhr.onprogress = event => {
      if (!cancelled)
        // eslint-disable-next-line
        setLog(xhr.responseText.replaceAll(/\u0001|\u0002|\u0010|\u0012|\u0013|\u0014|\u0015|\u0016|\u001b/g, ''))
    };

    xhr.send()
    return () => {
      cancelled = true;
      xhr.abort()
      setLog("")
    }
  }, [selectedContainer.Id, logValidId])

  const [showDetails, setShowDetails] = useState(false)

  const [commandOutput, setCommandOutput] = useState("")
  const [commandXhr, setCommandXhr] = useState(null)

  const runCommand = (cmd) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", (process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/execute/" + selectedContainer.Id + "/" + encodeURIComponent(cmd))

    xhr.onprogress = event => {
      // eslint-disable-next-line
      setCommandOutput(xhr.responseText.replaceAll(/\u0001|\u0002|\u0010|\u0012|\u0013|\u0014|\u0015|\u0016|\u001b/g, ''))
    };

    if(commandXhr)
      commandXhr.abort()
    setCommandXhr(xhr)
    xhr.send()
  }

  useEffect(() => { 
    return () => {
      if(commandXhr)
        commandXhr.abort()
    }
  })

  // reset everything, when the selected container switches
  useEffect(() => {
    if(commandXhr)
      commandXhr.abort()
    setShowDetails(false)
    invalidateLog()
    setCommandOutput(null)
  }, [selectedContainer.Id])

  return (
    <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose}>X</button>
      <h1>{selectedContainer.Names[0]}</h1>
      {selectedContainer.Names.length > 0 && (
        <h2>{selectedContainer.Names.map((name, index) => index > 1 ? name : '')} </h2>
      )}
      <label className={styles.status}>Status: {selectedContainer.State}. {selectedContainer.Status}.</label>
      <Controlboard containerId={selectedContainer.Id} onActionComplete={invalidateLog}/>
      <label>Image:</label>
      <Code value={selectedContainer.Image} oneLine />
      <label>Id:</label>
      <Code value={selectedContainer.Id} oneLine />
      <label>Command:</label>
      <Code value={selectedContainer.Command} oneLine />
      <div><label htmlFor="details">Show details:</label><input type="checkbox" id="details" onChange={(e) => setShowDetails(e.target.checked)} /></div>
      {showDetails && <Code value={JSON.stringify(selectedContainer, null, 2)} />}
      <h1>Run command:</h1>
      <Code oneLine onChange={ val => runCommand(val)} scrollToBottom />
      {
        commandOutput && 
        <Code scrollToBottom value={commandOutput}/>
      }
      <h1>Log:</h1>
      <Code value={log} scrollToBottom />
    </div>
  )
}