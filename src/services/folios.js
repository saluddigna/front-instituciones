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

service.solicitarFolios = function(data){
    // let data={
    //   study:estudio,
    //   quantity:cantidad,
    //   institution:institucion
    //   }
    return api.post('/api/folios/solicitar-folios', {
        headers: {
            'Content-Type': 'application/json',
        },
        data
    }).then(res => res.data)
  }

service.getSolicitados = function(id){
    return api.get('/api/folios/obtener-solicitados/'+id).then(res => res.data)
}

service.generarFolios = function(data){
  // let data={
  //   study:estudio,
  //   quantity:cantidad,
  //   institution:institucion
  //   }
  return api.post('/api/folios/generar-folios', {
      headers: {
          'Content-Type': 'application/json',
      },
      data
  }).then(res => res.data)
}

export default service
