module.exports = (sequelize, DataTypes) => {
  let BuildingCategory = sequelize.define("BuildingCategory", {
    id         : { field: 'id'        , type: DataTypes.INTEGER    , primaryKey: true , allowNull: false, autoIncrement: true },
    CategoryId : DataTypes.INTEGER,
    BuildingId : DataTypes.STRING(10),
    createdDate  : { field: 'createdDate' , type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedDate : { field: 'modifiedDate', type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedBy   : { field: 'modifiedBy'  , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
    createdBy    : { field: 'createdBy'   , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
  }, {
    freezeTableName: true,
    tableName: 'BuildingCategory',
    timestamps: false,
    deletedAt: false,
    hasTrigger: true
  })
  BuildingCategory.associate = models => {
    BuildingCategory.belongsTo(models.Category)
  }
  return BuildingCategory
}
