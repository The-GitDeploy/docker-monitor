import React, { useEffect, useState } from "react";
import styles from "./Code.module.scss"

export const Code = ({ value, scrollToBottom }) => {

  const [scrollOnUpdate, setScrollOnUpdate] = useState(scrollToBottom);

  const textRef = React.createRef();

  useEffect(() => {
    if (scrollToBottom && scrollOnUpdate && textRef && textRef.current)
      textRef.current.scrollTop = textRef.current.scrollHeight
  }, [value, textRef])

  const onScroll = (e) => {
    if (e.target.scrollTop+e.target.offsetHeight > e.target.scrollHeight-20)
      setScrollOnUpdate(true)
    else
      setScrollOnUpdate(false)
  }

  return <textarea ref={textRef} disabled value={value} className={styles.code} onScroll={onScroll} />
}