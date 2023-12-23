// Sequelize adalah sebuah ORM (Object-Relational Mapping) untuk Node.js
import { Sequelize } from "sequelize";
// Config untuk database seperti nama db, username, password
const db = new Sequelize("paginate_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
