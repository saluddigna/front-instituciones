import api from './api'
let service = {}

service.login = function(user, pass){
  let logIn={
    email:user,
    password:pass
  }
  return api.post('/api/login', logIn).then(res => res.data)
}

export default service