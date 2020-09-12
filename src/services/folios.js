import api from './api'
let service = {}

service.checkDisponibilidad = function(estudio, cantidad,institucion){
  let data={
    study:estudio,
    quantity:cantidad,
    institution:institucion
    }
  return api.post('/api/folios/checar', data).then(res => res.data)
}

export default service
