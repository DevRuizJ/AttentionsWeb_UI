function ValidateError(err){
  
  const _err = err!=="Network Error"?err:"Problemas del Servidor!"
  return _err
}
export default {
  ValidateError
};
