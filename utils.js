function getFormatFecha(date, separador){

  var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  var mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
  var yyyy = date.getFullYear();

  return (dd + separador + mm + separador + yyyy);
};

exports.getFormatFecha = getFormatFecha;
