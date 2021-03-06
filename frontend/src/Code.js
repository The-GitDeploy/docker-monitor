import React, { useEffect, useState } from "react";
import styles from "./Code.module.scss"

export const Code = ({ value, scrollToBottom, oneLine, onChange }) => {

  const [scrollOnUpdate, setScrollOnUpdate] = useState(scrollToBottom);

  const textRef = React.createRef();

  useEffect(() => {
    if (scrollToBottom && scrollOnUpdate && textRef && textRef.current)
      textRef.current.scrollTop = textRef.current.scrollHeight
  }, [value, textRef, scrollToBottom, scrollOnUpdate])

  const onScroll = (e) => {
    if (e.target.scrollTop+e.target.offsetHeight > e.target.scrollHeight-20)
      setScrollOnUpdate(true)
    else
      setScrollOnUpdate(false)
  }

  const onKeyPress = (e) => {
    if(e.code === "Enter" && e.ctrlKey === true) {
      onChange(e.target.value)
      e.target.value = ""
      return false
    }
  }

  return <textarea onKeyPress={onKeyPress} ref={textRef} disabled={!onChange} value={value} className={styles.code+" "+(oneLine?styles.oneLine:"")} rows={(oneLine?1:20)} onScroll={onScroll} />
}