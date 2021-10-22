import { useState } from "react"
import { Button } from "./Button"
import styles from "./Controlboard.module.scss"

export const Controlboard = ({ containerId, onActionComplete }) => {

  const actionHandler = (action, index) => {
    setButtons(buttons => {
      const newButtons = [...buttons]
      newButtons[index] = { ...newButtons[index], processing: true }
      return newButtons
    })
    fetch((process.env.NODE_ENV === "development" ? process.env.REACT_APP_BACKEND : "") + "/" + action + "/" + containerId)
      .then(response => {
        if (!response.ok) {
          throw new Error("API call failed!")
        }
        return response.json()
      })
      .then(response => {
        setButtons(buttons => {
          const newButtons = [...buttons]
          newButtons[index] = { ...newButtons[index], processing: false }
          return newButtons
        })

        if (response.error)
          alert(response.message)
        else
          onActionComplete()
      })
  }

  const [buttons, setButtons] = useState([
    {
      icon: "play_arrow",
      labelIdle: "Start",
      labelProcessing: "Starting",
      action: "start",
      processing: false
    },
    {
      icon: "autorenew",
      labelIdle: "Restart",
      labelProcessing: "Restarting",
      action: "restart",
      processing: false
    },
    {
      icon: "stop",
      labelIdle: "Stop",
      labelProcessing: "Stopping",
      action: "stop",
      processing: false
    },
    {
      icon: "delete_forever",
      labelIdle: "Delete",
      labelProcessing: "Deleting",
      action: "delete",
      processing: false
    }
  ])

  return (
    <div className={styles.controlboard}>
      {buttons.map((button, index) => {
        return (button.processing ?
          <Button key={index} icon={button.icon} label={button.labelProcessing} /> :
          <Button key={index} icon={button.icon} label={button.labelIdle} onClick={() => actionHandler(button.action, index)} />
        )
      })}
    </div>
  )

}