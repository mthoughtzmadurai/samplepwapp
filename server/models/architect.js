module.exports = (sequelize, DataTypes) => {
  let Architect = sequelize.define("Architect", {
    id           : { field: 'id'          , type: DataTypes.STRING(30)  , primaryKey: true , allowNull: false, autoIncrement: false },
    firstName    : { field: 'firstName'   , type: DataTypes.STRING(255) , primaryKey: false, allowNull: false },
    lastName     : { field: 'lastName'    , type: DataTypes.STRING(255) , primaryKey: false, allowNull: false },
    createdDate  : { field: 'createdDate' , type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedDate : { field: 'modifiedDate', type: DataTypes.DATE        , primaryKey: false, allowNull: true  },
    modifiedBy   : { field: 'modifiedBy'  , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
    createdBy    : { field: 'createdBy'   , type: DataTypes.STRING(10)  , primaryKey: false, allowNull: true  },
  }, {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'createdDate',
    updatedAt: 'modifiedDate',
    deletedAt: false
  })
  
  Architect.associate = models => {  
  
    Architect.hasMany(models.Building, {
      foreignKey: 'architectId',
      sourceKey: 'id',
      as: 'buildings'
    })

  }

  return Architect
}
