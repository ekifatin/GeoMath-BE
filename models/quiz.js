module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define('quiz', {
      
      nomor: {
        type: Sequelize.INTEGER,
        },
      Image: {
        type: Sequelize.STRING,
        },
      quiz: {
          type: Sequelize.STRING,
      },
      a: {
          type: Sequelize.STRING,
      },
      b: {
          type: Sequelize.STRING,
      },
      c: {
          type: Sequelize.STRING,
      },
      d: {
          type: Sequelize.STRING,
      },
      key: {
          type: Sequelize.STRING,
      },

  });
  return Quiz;
}