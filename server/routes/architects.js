const models  = require('../models')
const express = require('express')
const router  = express.Router()

// models to be included on routes
let architectInclude = [
  // { model: models.Building, as: 'buildings',
    // include: [{model: models.Category, as: 'category'}],
  // },
]

let buildingInclude = [
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

router.get(   '/', (req, res) => {
  
  let offset = parseInt(req.query.offset) || 1
  let limit  = parseInt(req.query.limit)  || 100
  
  let order = null
  if( req.query.sort ){
    order = [ req.query.sort ]
  }
  
  let options = {
    where: req.query.where,
    limit,
    offset,
    include: architectInclude,
    attributes,
    order,
  }

  models.Architect.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not get architects')
  })
  
})
router.post(  '/', (req, res) => {
  
  var emp = req.body;
  emp["createdBy"] = req.userInfo.email;
  emp["modifiedBy"] = req.userInfo.email;
  
  models.Architect.create( emp ).then( architect => {
    res.status(201).send(architect)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not create architect')
  })
  
})
router.put(   '/:architectId', (req, res) => {
  
  var emp = req.body;
  emp["modifiedBy"] = req.userInfo.email;
  
  models.Architect.update(req.body,{
    where: {id: req.params.architectId}
  }).then( affectedRows => {
    res.status(204).send({ affectedRows })
  }).catch( err =>{
    console.log(err)
    res.status(500).send('could not update architect')
  })
  
})
router.get(   '/:architectId', (req, res) => {
  
  let options    = {
    where: { id: req.params.architectId },
    include: architectInclude,
    attributes,
  }

  models.Architect.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send(`could not find architect with id ${req.params.architectId}`)
  })
  
})
router.post(  '/:architectId/buildings', (req, res) => {
  
  let emp = req.body;
  
  models.Building.create( emp ).then( building => {
    res.status(201).send(building)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not create building')
  })
  
})
router.get(   '/:architectId/buildings', (req, res) => {
  
  let offset = parseInt(req.query.offset) || 1
  let limit  = parseInt(req.query.limit)  || 100
  
  let order = null
  if( req.query.sort ){
    order = [ req.query.sort ]
  }
  
  let options = {
    where: {
      // ...req.query.where,
      architectId: req.params.architectId
    },
    limit,
    offset,
    include: buildingInclude,
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
router.get(   '/:architectId/buildings/:buildingId', (req, res) => {
  
  let options    = {
    where: { id: req.params.buildingId },
    include: buildingInclude,
    attributes,
  }

  models.Building.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send(`could not find building with id ${req.params.buildingId}`)
  })
  
})
router.put(   '/:architectId/buildings/:buildingId', (req, res) => {
  
  let emp =req.body
  
  models.Building.update( emp, {
    where: {id: req.params.buildingId}
  }).then( affectedRows => {
    res.status(204).send({ affectedRows })
  }).catch( err =>{
    console.log(err)
    res.status(500).send('could not update building')
  })
  
})
router.delete('/:architectId/buildings/:buildingId', (req, res) => {

  let options = {
    where: { id: req.params.goalId }
  }

  models.Building.destroy( options ).then( affectedRows => {
    res.status(204).send({
      affectedRows
    })
  }).catch( err => {
    console.log(err)
    res.status(500).send(`Could not delete Building with id ${req.params.buildingId}`)
  })

})

module.exports = router
