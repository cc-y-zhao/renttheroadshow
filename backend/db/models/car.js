'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    ownerId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    model: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {});
  Car.associate = function(models) {
    // associations can be defined here
    Car.belongsTo(models.User, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE'
    });
  };
  return Car;
};
