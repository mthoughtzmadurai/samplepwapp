const request = require('request')
const btoa = require('btoa')

const Auth = function(config){
  
  this.config = config;
  
  // adds user info to a request from Okta
  this.addUserInfoToRequest = (req, res, next, resp) => {
    return request( this.apiOptions(resp), (error, response, body) =>{
      let userInfo = JSON.parse(body)
      req.userInfo = userInfo.profile
      next()
    })
  }
  
  this.introspectOptions = authParams => {
    return {
      uri: this.config.oktaSettings.orgUrl + '/oauth2/v1/introspect',
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        authorization: 'Basic ' + btoa(this.config.oktaSettings.clientId + ':' + this.config.oktaSettings.clientSecret)
      },
      form: { token: authParams[1], token_type_hint: 'access_token' }
    }
  }
  
  this.apiOptions = resp => {
    return {
      uri: this.config.oktaSettings.orgUrl + '/api/v1/users/' + resp.sub,
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': 'SSWS ' + this.config.oktaSettings.apiToken
      }
    }
  }

  this.protect = (req, res, next) => {
    
    if(!this.config){
      throw new Exception(`no config`)
    }

    if (req.method === 'OPTIONS' ) {
      return next()
    }
    
    if(!req.get('Authorization')){
      return res.status(401).send({error: 'Unauthorized'})
    }
    
    const authorization = req.get("Authorization")
    const authParams = authorization.split(" ")
    
    if ((authParams.length !== 2) || !(authorization.includes('Bearer '))) {
      return res.status(401).send({error: 'Unauthorized'})
    }
    
    request( this.introspectOptions(authParams), (error, response, body) => {
      let resp = JSON.parse(body)
      if(resp.active === false){
        res.status(401).send({error: 'Unauthorized'})
      } else if(resp.active === true) {
        next()
      }
    })
  }

  this.addUserInfo = (req, res, next) => {

    if( req.method === 'OPTIONS' || !req.path.includes('/api/v1') ){
      return next()
    }
    
    if(!req.get('Authorization')){
      return next()
    }
    
    const authorization = req.get("Authorization")
    const authParams = authorization.split(" ")

    if( (authParams.length !== 2) || !(authorization.includes('Bearer ')) ){
      return next()
    }
    
    request(  this.introspectOptions(authParams), (error, response, body) => {
      let resp = JSON.parse(body)
      if(resp.active === false){
        next()
      } else if(resp.active === true) {
        this.addUserInfoToRequest( req, res, next, resp )
      }
    })
  }

  this.isValid = token => {
    if(!token.active){
      return false
    }
    return token.aud === this.config.oktaSettings.clientId && token.iss === this.config.oktaSettings.orgUrl
  }
  
  return this
}

module.exports = Auth
