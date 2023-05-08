import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      ...credentials
    })
  
    if (result.error) {
      // Tratar erro de autenticação
      console.error(result.error)
  
      // Redirecionar para a página de usuário não logado
      router.push('/indexNaoLogado')
    } else {
      // Redirecionar para a página principal após o login bem-sucedido
      router.push('/indexLogado')
    }
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  if (sessionStatus === 'loading') {
    return <div>Carregando...</div>
  }

  if (session) {
    router.push('/')
    return null
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method="post">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
