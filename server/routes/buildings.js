const models  = require('../models')
const express = require('express')
const router  = express.Router()

// models to be included on routes
let include = [
  { model: models.Category, as: 'category',
  },
  { model: models.Architect, as: 'architect',
  },
]

let attributes = {
  exclude: [
    /* fields from the DB that should be hidden */
  ]
}

router.get('/', (req, res) => {
  
  let pageNumber = parseInt(req.query.PageNumber) || 1
  let pageSize   = parseInt(req.query.PageSize)   || 100
  
  let order = null
  if( req.query.sort ){
    order = [ req.query.sort ]
  }
  
  let options = {
    where: req.query.where,
    limit: pageSize, offset: ((pageNumber - 1) * pageSize),
    include,
    attributes,
    order,
  }

  models.Building.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not get buildings')
  })
  
})

router.get('/:buildingId', (req, res) => {
  
  let options    = {
    where: { id: req.params.buildingId },
    include,
    attributes,
  }

  models.Building.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send(`could not find building with id ${req.params.buildingId}`)
  })
  
})

router.post('/', (req, res) => {
  
  let emp = req.body
  emp.createdBy = req.userInfo.email
  
  models.Building.create( emp ).then( building => {
    res.status(201).send(building)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not create building')
  })
  
})

router.put('/:buildingId', (req, res) => {
  
  models.Building.update(req.body,{
    where: {id: req.params.buildingId}
  }).then( affectedRows => {
    res.status(204).send({ affectedRows })
  }).catch( err =>{
    console.log(err)
    res.status(500).send('could not update building')
  })
  
})

module.exports = router
