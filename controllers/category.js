const db = require("../models");
const Category = db.categories;

exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            const Categories = data.map(Category => {
                return {
                    nomor:Category.nomor,
                    Image:Category.Image,
                    Category: Category.Category,
                    a: Category.a,
                    b: Category.b,
                    c: Category.c,
                    d: Category.d,
                    key: Category.key,
                }
            })

            res.send(Categories)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving categories.'
            })
        })
}

//CREATE: untuk menambahkan data ke dalam tabel Category
exports.create = async (req, res) => {

    try {
        const data = await Category.create(req.body)
        res.json({
            message: "Category created successfully.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ,
            data: null,
        });
    }
}

//READ: menampilkan atau mengambil semua data Category sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        const categories = await Category.findAll()
        res.json({
            message: "categories retrieved successfully.",
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
        const Category = await Category.findByPk(id, { rejectOnEmpty: true})
        Category.update(req.body, {
            where: {id}
        })
        res.json({
            message: "categories updated successfully.",
            data: Category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Category",
            data: null,
        });
    }
}

// Menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const Category = await Category.findByPk(id, { rejectOnEmpty: true})

        Category.destroy()

        res.json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Category",
            data: null,
        });
    }
}

// Mengambil data sesuai id yang dikirmkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const Category = await Category.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `categories retrieved successfully with id=${id}.`,
            data: Category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Category",
            data: null,
        });
    }
};

// Menampilkan atau mengambil semua data Category berdasarkan category tertentu
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const categories = await Category.findAll({
        where: {
            categoryId: id
        }
    })
    res.json({
        message: `categories retrieved successfully woth categoryId=${id}.`,
        data: categories,
    });
}

// Menampilkan atau mengambil semua data Category berdasarkan level tertentu
// exports.getByLevelId = async (req, res) => {
//     const id = req.params.id
//     const categories = await Category.findAll({
//         where : {
//             levelId: id
//         }
//     })
//     res.json({
//         message: `categories retrieved successfully with levelId=${id}.`,
//         data: categories,
//     });
// }