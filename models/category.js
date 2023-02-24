module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    categoryName: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },

  });
  return Category;
}