import api from './api'
let service = {}

service.getEstudios = function(id){
  return api.get('/api/studies/'+id).then(res => res.data)
}

export default service