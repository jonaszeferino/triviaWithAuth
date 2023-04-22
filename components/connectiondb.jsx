import mysql from "mysql2/promise";

const dbConfig = {
  host: "db4free.net",
  port: "3306",
  user: "adminomni",
  password: "Linx@2023",
  database: "omnitools",
  connectionLimit: 10,
  queueLimit: 0,
};

export async function connectionRdsMySql() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

//novo 200mb
// Banco de dados: omnitools
// Nome de usuário: adminomni
// Email: jonas.zeferino@linx.com.br

//antigo limtado a 5mb 
//dataBase location - limite 5mb
//https://www.freemysqlhosting.net/account/ 

