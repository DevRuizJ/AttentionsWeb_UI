import React from 'react'
import Workbook from 'react-excel-workbook'
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

const ExportExcel = ({fileName="test",header,data}) => {
  return (
    <div className="row text-center">
      <Workbook filename={fileName+".xlsx"} element={ <Button color="secondary" startIcon={<GetAppIcon /> }>Descargar</Button>      }>
        <Workbook.Sheet data={data} name="Reporte">
          {header&&header.map(col=><Workbook.Column label={col.title} value={col.field}/>)}          
        </Workbook.Sheet>
      </Workbook>
    </div>
  )
}

export default ExportExcel
