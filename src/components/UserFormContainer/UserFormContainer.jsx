import style from './userFormContainer.module.css'

const UserFormContainer = ({ title, children }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      {children}
    </div>
  )
}
export default UserFormContainer
