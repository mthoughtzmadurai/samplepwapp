module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define("Category", {
    id           : { field: 'id'          , type: DataTypes.INTEGER     , primaryKey: true, autoIncrement: true },
    name         : { field: 'name'        , type: DataTypes.STRING(1024), allowNull: false, unique: true },
    sortOrder    : { field: 'sortOrder'   , type: DataTypes.STRING(1024), allowNull: false },
    createdDate  : { field: 'createdDate' , type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedDate : { field: 'modifiedDate', type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedBy   : { field: 'modifiedBy'  , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
    createdBy    : { field: 'createdBy'   , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
  }, {
    freezeTableName: true,
    tableName: 'Category',
    timestamps: false,
    deletedAt: false
  });

  return Category
}