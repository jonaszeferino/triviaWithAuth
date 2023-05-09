import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const options = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }

      },
      
      authorize: async (credentials) => {

        try {
          const response = await fetch("http://localhost:3000/api/v1/getUsers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
          
          const data = await response.json();
          console.log(data)
          if (response.ok && data.results === 'pass') {
         
            return Promise.resolve(credentials);
          } else {
         
            return Promise.reject(new Error('Credenciais inválidas'));
          }
        } catch (error) {
         
          return Promise.reject(new Error('Erro ao verificar as credenciais'));
        }
      }

    })
  ],
  pages: {
    signIn: '/login' // Página de login personalizada
  },
  callbacks: {
    async signIn(user, account, profile) {
      // Redirecionamento personalizado após o login
      // nao entendi exatametne o que é feito aqui, pois o redirect acontece na tela de login
      if (user) {
        return Promise.resolve('http://localhost:3000/indexLogado'); // Redireciona para a página de usuário logado
      } else {
        return Promise.resolve('http://localhost:3000/indexNaoLogado'); // Redireciona para a página de usuário não logado
      }
    },
    async session(session, user) {
      // Aqui você pode adicionar ou modificar dados da sessão do usuário
      session.user = user;
      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Aqui você pode adicionar ou modificar dados no token JWT
      return Promise.resolve(token);
    }
  }
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth