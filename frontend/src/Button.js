import styles from "./Button.module.scss"

export const Button = ({ icon, label, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div>{label}</div>
    </div>
  )
}