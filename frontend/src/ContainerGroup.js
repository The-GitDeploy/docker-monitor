import styles from "./ContainerGroup.module.scss"
export const ContainerGroup = ({ containers, setSelectedContainerId, project }) => {

  return (
    <div className={styles.wrapper}>
      <h2>{project}</h2>
      <div className={styles.listContainer}>
      {containers && containers.map(c => {
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
    </div>
  )
}