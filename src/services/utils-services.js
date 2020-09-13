let service = {}
var filtroEstudio=null

service.getFiltroEstudio = function(){
  return filtroEstudio
}


service.setFiltroEstudio = function(filtro){
  filtroEstudio=filtro
  return filtroEstudio
}


export default service