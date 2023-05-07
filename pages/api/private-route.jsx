import { getSession } from 'next-auth/client'

async function privateRouteHandler(req, res) {
  const session = await getSession({ req })

  if (session) {
    // Acesso permitido
    res.status(200).json({ message: 'Acesso permitido' })
  } else {
    // Acesso negado
    res.status(401).json({ error: 'Acesso negado' })
  }
}

export default privateRouteHandler;