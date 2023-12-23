// Menggunakan sequelize untuk membuat model user
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
// Membuat skema untuk model atau tabel user
const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default User;

// Function Immediately Invoked Function Expression (IIFE) untuk membuat table user jika table user tidak terdapat didalam database paginate_db
(async () => {
  await db.sync();
})();
