import { NextPage } from 'next';
import styles from "../../styles/login.module.css";

interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
  return <div className={styles.container}>
    <form className={styles.form} >
      <h1 className={styles.h1} >Login</h1>
      <input className={styles.input} type='email' placeholder='youremail@domain.com' ></input>
      <input className={styles.input} type='password' placeholder='********'></input>
      <input className={styles.input} type='submit' value='login' />
    </form>
  </div>
}
export default SignIn;