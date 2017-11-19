module.exports = (sequelize, DataTypes) => {
  let Building = sequelize.define("Building", {
    id           : { field: 'id'          , type: DataTypes.INTEGER     , primaryKey: true , autoIncrement: true },
    name         : { field: 'name'        , type: DataTypes.STRING(255) , primaryKey: false, allowNull: false },
    location     : { field: 'location'    , type: DataTypes.STRING(2000), primaryKey: false, allowNull: false },
    architectId  : { field: 'architectId' , type: DataTypes.STRING(30)  , primaryKey: false, allowNull: true  },
    description  : { field: 'description' , type: DataTypes.STRING(4000), primaryKey: false, allowNull: false },
    dateBuilt    : { field: 'dateBuilt'   , type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    isCompleted  : { field: 'isCompleted' , type: DataTypes.BOOLEAN     , primaryKey: false, allowNull: true  },
    createdDate  : { field: 'createdDate' , type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedDate : { field: 'modifiedDate', type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedBy   : { field: 'modifiedBy'  , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
    createdBy    : { field: 'createdBy'   , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
  }, {
    freezeTableName: true,
    timestamps: false,
    deletedAt: false
  })
  
  Building.associate = models => {
    
    Building.belongsToMany(models.Category, {
      through: models.BuildingCategory,
      as: 'category'
    })
    
    Building.belongsTo( models.Architect, {
      foreignKey: 'architectId',
      as: 'architect'
    })
    
  }
  
  return Building
}
