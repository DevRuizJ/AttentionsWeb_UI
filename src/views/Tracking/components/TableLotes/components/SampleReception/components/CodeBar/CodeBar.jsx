import React from 'react'
import {  IconButton } from "@material-ui/core";
import BarCode from "assets/icons/BarCode"

import Bar from './Bar';
import PrintComponents from "react-print-components";
function uniqueObj(arr){
  let arrUnique = []
  arr.forEach(v=>{
    const itemfind =arrUnique.find(m=>m.codigo===v.codigo)
    if(!itemfind) arrUnique.push(v)
  })
  return arrUnique
}

const CodeBar = ({loteAtenciones}) => {
  const [listCodeMuestras, setListCodeMuestras]=React.useState(null)
  React.useEffect(()=>{
    if(loteAtenciones){
      let lista = []
      loteAtenciones.forEach(element => {
        const {muestras,paciente,sexo,edad} = element
        uniqueObj(muestras).forEach(muestra => {
          const {codigo,descripcion,tubo,nroorden}=muestra
          lista.push({
            orden:`${nroorden}-${codigo}`,
            descripcion,
            tubo,
            paciente,
            sexo,
            edad
          })
        });

      });
      setListCodeMuestras(lista)
    }
  },[loteAtenciones])
  
  return (

    <>
    {listCodeMuestras&&
    <PrintComponents
      trigger={  <IconButton  color="primary" >  <BarCode /></IconButton>}   >
      {listCodeMuestras.map(item=><Bar muestra={item}/>)}
    </PrintComponents>
    }
      
    </>
  )
}

export default CodeBar
