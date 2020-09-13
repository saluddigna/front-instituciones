import api from './api'
let service = {}

service.getEstudios = function(){
  return api.get('/api/studies').then(res => res.data)
}

export default service