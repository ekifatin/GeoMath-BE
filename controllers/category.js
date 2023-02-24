const db = require("../models");
const Category = db.categories;

//CREATE: untuk menambahkan data ke dalam tabel category
exports.create = async (req, res) => {
    try {
        const data = await Category.create(req.body)
        res.json({
            message: "category created successfully.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ,
            data: null,
        });
    }
  }
  
  

//READ: menampilkan atau mengambil semua data category sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        const categories = await Category.findAll()
        res.json({
            message: "Categories retrieved successfully.",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:null,
        })
    }
};

// Mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findByPk(id, { rejectOnEmpty: true})
        category.update(req.body, {
            where: {id}
        })
        res.json({
            message: `Data dengan id=${id} berhasil diubah`,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving category",
            data: null,
        });
    }
}

// Menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findByPk(id, { rejectOnEmpty: true})

        category.destroy()

        res.json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving category",
            data: null,
        });
    }
}

// Mengambil data sesuai id yang dikirmkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Categories retrieved successfully with id=${id}.`,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving category",
            data: null,
        });
    }
};