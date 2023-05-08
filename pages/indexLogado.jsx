import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function teste() {
  const [answers, setAnswers] = useState({ questions: [] });

  return (
    <div>
      <h1>Hello world! Logado!</h1>
    </div>
  );
}