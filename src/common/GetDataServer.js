import Axios from "axios"

const ErrorServer = 'Lo sentimos estamos teniendo problemas con nuestro servidor. Intentelo mas tarde!'

const GetDataServer=(_method, _url,authorization=false,_data=null)=>
{
  var config = {
    method: _method,
    url: _url
  }

  if(authorization)
  {
    const token = localStorage.getItem("token")
    config= {...config,
      headers: { 
        'Authorization':  `Bearer ${token}`
      }
    }
  }

  if(_method.toUpperCase()!=='GET')
  {    
    _data = JSON.stringify(_data)
    config= {...config,
      headers: { 
        ...config.headers,
        'Content-Type': 'application/json'
      },
      data:_data
    }
  }
  
  return new Promise((resolve, reject)=>{
    Axios(config)
    .then(function (response) {
      resolve(response.data)
    })
    .catch(function (error) {
      
      let messageError = ErrorServer
      try {
        messageError = error.response.data.errores.Mensaje
      }
      catch {}
      reject(messageError)
    });
  })
}

export default GetDataServer
