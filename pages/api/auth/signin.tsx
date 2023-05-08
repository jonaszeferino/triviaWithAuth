import { NextPage } from "next";
import styles from "../../styles/login.module.css";
import { FormEventHandler, useState } from "react";
import { signIn } from 'next-auth/react'
import axios from 'axios'

interface Props { }

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/getUsers')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const postUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/postUsers', user)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    });
    console.log(res)

    // Chamada ao método getUsers
    getUsers()

    // Chamada ao método postUser
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    }
    postUser(newUser)
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} method="post">
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
        <button type="submit" className={styles.input}>Login</button>
      </form>
    </div>
  );
};
export default SignIn;