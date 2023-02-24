const db = require("../models");
const Quiz = db.quizzes;

exports.findAll = (req, res) => {
    Quiz.findAll()
        .then(data => {
            const quizzez = data.map(quiz => {
                return {
                    nomor:quiz.nomor,
                    Image:quiz.Image,
                    quiz: quiz.quiz,
                    a: quiz.a,
                    b: quiz.b,
                    c: quiz.c,
                    d: quiz.d,
                    key: quiz.key,
                }
            })

            res.send(quizzez)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving relation.'
            })
        })
}
exports.answer = (req, res) => {
    Quiz.answer()
        .then(data => {
            const quizzez = data.map(quiz => {
                return {
                    pembahasan:quiz.pembahasan
                }
            })

            res.send(quizzez)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving relation.'
            })
        })
}

//CREATE: untuk menambahkan data ke dalam tabel quiz
exports.create = async (req, res) => {

    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz created successfully.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ,
            data: null,
        });
    }
}

//READ: menampilkan atau mengambil semua data quiz sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        const relation = await Quiz.findAll()
        res.json({
            message: "relation retrieved successfully.",
            data: relation,
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
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "relation updated successfully.",
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quiz",
            data: null,
        });
    }
}

// Menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})

        quiz.destroy()

        res.json({
            message: "Quiz deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quiz",
            data: null,
        });
    }
}

// Mengambil data sesuai id yang dikirmkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `relation retrieved successfully with id=${id}.`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quiz",
            data: null,
        });
    }
};

// Menampilkan atau mengambil semua data quiz berdasarkan category tertentu
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const relation = await Quiz.findAll({
        where: {
            categoryId: id
        }
    })
    res.json({
        message: `relation retrieved successfully woth categoryId=${id}.`,
        data: relation,
    });
}

// Menampilkan atau mengambil semua data quiz berdasarkan level tertentu
// exports.getByLevelId = async (req, res) => {
//     const id = req.params.id
//     const relation = await Quiz.findAll({
//         where : {
//             levelId: id
//         }
//     })
//     res.json({
//         message: `relation retrieved successfully with levelId=${id}.`,
//         data: relation,
//     });
// }