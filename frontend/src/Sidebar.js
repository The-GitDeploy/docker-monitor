import { useEffect, useState } from "react";
import { Code } from "./Code"
import { Controlboard } from "./Controlboard"
import styles from "./Sidebar.module.scss"

export const Sidebar = ({ selectedContainer, onClose }) => {
  const [log, setLog] = useState("")
  useEffect(() => {
      let xhr = new XMLHttpRequest()
      let cancelled = false
      xhr.open("GET", (process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/log/" + selectedContainer.Id)

      xhr.onprogress = event => {
        if (!cancelled)
          setLog(xhr.responseText.replaceAll(/\u0001|\u0002|\u0010|\u0012|\u0013|\u0014|\u0015|\u0016|\u001b/g, ''))
      };

      xhr.send()
      return () => {
        cancelled = true;
        xhr.abort()
        setLog("")
      }
  }, [selectedContainer])

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose}>X</button>
      <h1>{selectedContainer.Names[0]}</h1>
      {selectedContainer.Names.length > 0 && (
        <h2>{selectedContainer.Names.map((name, index) => index > 1 ? name : '')} </h2>
      )}
      <label className={styles.status}>Status: {selectedContainer.State}. {selectedContainer.Status}.</label>
      <Controlboard containerId={selectedContainer.Id} />
      <label>Image:</label>
      <Code value={selectedContainer.Image} oneLine />
      <label>Id:</label>
      <Code value={selectedContainer.Id} oneLine />
      <label>Command:</label>
      <Code value={selectedContainer.Command} oneLine />
      <div><label for="details">Show details:</label><input type="checkbox" id="details" onChange={(e) => setShowDetails(e.target.checked)} /></div>
      {showDetails && <Code value={JSON.stringify(selectedContainer, null, 2)} />}
      <h1>Log:</h1>
      <Code value={log} scrollToBottom />
    </div>
  )
}