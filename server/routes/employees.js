let models = require('../models')
let express = require('express')
let router = express.Router()

let officeAttrs = {
  // exclude: ['regionId']
}

let goalIncludes = [
  {model: models.Employee  , as: 'owner',
    include: { model: models.Office, as: 'office' }
  },
  {model: models.Employee  , as: 'modifiedByUser'   },
  {model: models.Employee  , as: 'insertedByUser'   },
  {model: models.Priority  , as: 'priority'         },
  {model: models.Status    , as: 'status'           },
  {model: models.Theme     , as: 'theme'            },
  {model: models.Comment   , as: 'comments'         },
  {model: models.Group     , as: 'primaryGroup'     },
  {model: models.Theme     , as: 'relatedThemes'    },
  {model: models.Group     , as: 'relatedGroups'    },
]

let primary   = {model: models.Employee  , as: 'relatedEmployees' }

function uniqueResults(array,on='id') {
  let inArray = {}
  let out = []
  array.map( item => {
    if(!item[on] || inArray[item[on]]){
      return
    }
    inArray[item[on]] = true
    out.push(item)
  })
  return out
}

// models to be included on routes
let includes = [
  { model: models.Office, as: 'office',
    include: [{model: models.Region, as: 'region'}],
    attributes: officeAttrs
  },
  // { model: models.GoalTeam }
]
// fields from the DB that should be hidden
let attributes = {
  exclude: [
    // 'officeId'
  ]
}

router.get('/', (req, res) => {
  
  let pageNumber = parseInt(req.query.PageNumber) || 1
  let pageSize = parseInt(req.query.PageSize) || 100
  
  let order = null
  if( req.query.sort ){
    order = [ req.query.sort ]
  }
  
  let options = {
    where: req.query.where,
    limit: pageSize, offset: ((pageNumber - 1) * pageSize),
    include: includes,
    attributes: attributes,
    order: order
  }

  models.Employee.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send('Could not find employees')
  })
})
router.get('/suggest', (req, res) => {
  if((!req.query) || (!req.query.query) || (req.query.query.length < 0)){ // only check db if more than 2 chars in the query, else return []. PERFORMANCE!
    return res.status(200).send([])
  }
  let pageNumber = parseInt(req.query.PageNumber) || 1
  let pageSize = parseInt(req.query.PageSize) || 100
  let options = {
    limit: pageSize, offset: ((pageNumber - 1) * pageSize),
  }
  console.log(`running query ${req.query.query}`)
  if(req.query.query.indexOf(' ') > -1){
    console.log(req.query.query.split(' ')[0])
    options.where = {
      $or: [{
        status: 'A',
        $and: [{
          firstName: {
            $like: '%' + req.query.query.split(' ')[0] + '%'
          }
        }, {
          lastName: {
            $like: '%' + req.query.query.split(' ')[1] + '%'
          }
        }]
      },
        {
          status: 'A',
          $and: [{
            firstName: {
              $like: '%' + req.query.query.split(' ')[1] + '%'
            }
          }, {
            lastName: {
              $like: '%' + req.query.query.split(' ')[0] + '%'
            }
          }]
        }]
    }
  } else {
    options.where = {
      status: 'A',
      $or: [{
        firstName: {
          $like: '%' + req.query.query + '%'
        }
      }, {
        lastName: {
          $like: '%' + req.query.query + '%'
        }
      }]
    }
  }
  models.Employee.findAll(options).then( employees => {
    res.send(employees)
  }).catch( err => {
    console.log(err)
    res.status(500).send('Something went wrong')
  })
})
router.get('/:employeeId', (req, res) => {
  let options    = {
    where: { id: req.params.employeeId },
    include: includes,
    attributes: attributes
  }

  models.Employee.findAll(options).then( goals => {
    res.send(goals)
  }).catch( err => {
    console.log(err)
    res.status(500).send('Something went wrong')
  })
})
router.post('/', (req, res) = > {
  let emp = req.body
  models.Goal.create( emp ).then( employee => {
    res.status(201).send(employee)
  }).catch( err => {
    console.log(err)
    res.status(500).send('could not create employee')
  })
})
router.put('/:employeeId', (req, res) => {

  models.Employee.update(req.body,{
    where: {id: req.params.employeeId}
  }).then( affectedRows => {
    res.status(204).send({ affectedRows })
  }).catch( err =>{
    console.log(err)
    res.status(500).send('could not update employee')
  })
})

module.exports = router
