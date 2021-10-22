import { useState } from "react"
import { Button } from "./Button"
import styles from "./Controlboard.module.scss"

export const Controlboard = ({ containerId }) => {

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
        console.log(response)
        setButtons(buttons => {
          const newButtons = [...buttons]
          newButtons[index] = { ...newButtons[index], processing: false }
          return newButtons
        })
      })
  }

  const [buttons, setButtons] = useState([
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
    }
  ])

  return (
    <div className={styles.controlboard}>
      {buttons.map((button, index) => {
        return (button.processing ?
          <Button icon={button.icon} label={button.labelProcessing} /> :
          <Button icon={button.icon} label={button.labelIdle} onClick={() => actionHandler(button.action, index)} />
        )
      })}
    </div>
  )

}