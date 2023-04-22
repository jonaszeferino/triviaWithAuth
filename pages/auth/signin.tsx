import { NextPage } from "next";
import styles from "../../styles/login.module.css";
import { FormEventHandler, useState } from "react";

interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLAnchorElement> = async (e) => {
    //validar o usuário
    e.preventDefault()

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    });

    console.log(res)

  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.h1}>Login</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="youremail@domain.com"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        ></input>
        <input
          className={styles.input}
          type="password"
          placeholder="********"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        ></input>
        <input className={styles.input} type="submit" value="login" />
      </form>
    </div>
  );
};
export default SignIn;