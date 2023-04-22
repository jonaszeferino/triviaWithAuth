import { signIn } from "next-auth/client";

function SignInButton() {
  return <button onClick={() => signIn('google')}>Sign in</button>;
}

export default SignInButton;
