// Didalam controller kita mengimport model user
import User from "../models/UserModel.js";
// operators
import { Op } from "sequelize";

// Function untuk handle get User
export const getUser = async (req, res) => {
  // Mengambil data current page
  const page = parseInt(req.query.page) || 0;
  // Limit adalah batas data yg ingin  ditampilkan
  const limit = parseInt(req.query.limit) || 10;
  // Search berisi keyword pencarian yg diketikkan oleh user
  const search = req.query.search_query || "";
  // offset adalah jumlah skip data pada tiap halaman
  const offset = page * limit;
  // totalRows adalah total dari keseluruhan data atau record yg ditampilkan (prosesnya async)
  const totalRows = await User.count({
    // karna kita tidak selalu menghitung semua record, melainkan hanya menghitung record berdasarkan keyword tertentu
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },
  });
  // Mengambil jumlah page dari hasil totalbarisdata dibagi limit data
  const totalPage = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};
