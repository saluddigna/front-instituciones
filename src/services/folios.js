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


  service.getDisponibles = function(id){
    return api.get('/api/folios/disponibles-institucion/'+id).then(res => res.data)
}

service.getSolicitados = function(id){
    return api.get('/api/folios/obtener-solicitados/'+id).then(res => res.data)
}

service.generarFolios = function(data){
  return api.post('/api/folios/generar-folios', {
      headers: {
          'Content-Type': 'application/json',
      },
      data
  }).then(res => res.data)
}
service.getGenerados = function(id){
  return api.get('/api/folios/obtener-generados/'+id).then(res => res.data)
}

service.asignarBeneficiario = function(data){
  return api.post('/api/assignedFolios/create', data).then(res => res.data)
}

service.getAsignados = function(id,filtro){
  return api.get('/api/folios/obtener-asignados?' + `id=${id}&filtro=${filtro}`).then(res => res.data)
}

service.getAsignadosIdFolio = function(id,filtro){
  return api.get('/api/folios/obtener-asignados-id-folio?' + `id=${id}&filtro=${filtro}`).then(res => res.data)
}

service.getAsignadosImpresos = function(id,filtro){
  return api.get('/api/folios/obtener-asignados-impresos?' + `id=${id}&filtro=${filtro}`).then(res => res.data)
}

service.updateImpresos = function(id) {
  return api.post('/api/folios/actualiza-status-impresion', id).then(res => res.data)
}

export default service
