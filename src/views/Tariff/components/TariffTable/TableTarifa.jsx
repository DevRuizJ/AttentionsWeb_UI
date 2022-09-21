import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  makeStyles,
  withWidth,
  Typography,
  Divider,
  Paper
} from '@material-ui/core';

import {
  Science as ScienceIcon,
  BioMolecular as BioMolecularIcon,
  BioQuimica as BioQuimicaIcon,
  Coagulacion as CoagulacionIcon,
  Genetica as GeneticaIcon,
  Hematologia as HematologiaIcon,
  Inmunoquimica as InmunoquimicaIcon,
  MicroBio as MicroBioIcon,
  Patologica as PatologicaIcon,
  Urianalisis as UrianalisisIcon
} from "../../../../assets/icons";

import { ExamTable } from '..';
import IconGroupExam from './Components/IconGroupExam';
import TabPanel from './Components/TabPanel';

// function TabPanel(props) {
//   const { value, groupSelect, tableSelect } = props;
//   return (
//     <div
//       role="tabpanel"
//       id={`vertical-tabpanel`}
//       aria-labelledby={`vertical-tab`}
//       style={{ width: "100%" }}
//     >
//       <Box>
//         {
//           value
//             ?
//             <ExamTable data={value} groupSelect={groupSelect} tableSelect={tableSelect} />
//             : <div>Cargando...</div>
//         }
//       </Box>
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   value: PropTypes.any.isRequired,
// };

// function IconGroupExam(props) {
//   const { Group, active } = props;
//   switch (Group) {
//     case '0102': return (<PatologicaIcon active={active} />)
//     case '0103': return (<BioMolecularIcon active={active} />)
//     case '0104': return (<BioQuimicaIcon active={active} />)
//     case '0105': return (<CoagulacionIcon active={active} />)
//     case '0106': return (<HematologiaIcon active={active} />)
//     case '0107': return (<InmunoquimicaIcon active={active} />)
//     case '0108': return (<MicroBioIcon active={active} />)
//     case '0109': return (<UrianalisisIcon active={active} />)
//     case '0177': return (<GeneticaIcon active={active} />)
//     default: return (<ScienceIcon active={active} />)
//   }
//   ;
// }
// IconGroupExam.propTypes = {
//   Group: PropTypes.any.isRequired,
//   active: PropTypes.any.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  boxCreateAtc: {
    padding: theme.spacing(1.5, 0),
  },
  contentTable: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    }
  },
  tabs: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    minWidth: "200px",
    paddingRight: theme.spacing(1),
    '& .MuiTabs-indicator': {
      left: '0'
    }
  },
  sectionTitleTable: {
    display: 'flex',
    margin: theme.spacing(1, 0)
  },
  sectionTitleTableLeft: {
    width: "calc(100% - 200px)",
    textAlign: 'center',
    fontWeight: "600"
  },
  sectionTitleTableRigth: {
    minWidth: "200px",
    textAlign: 'center',
    fontWeight: "600"
  },
  iconSelect: {
    color: theme.palette.primary.main
  }
}));

const TableTarifa = ({ /*listGrupos,*/ listServices, onSelect, width, tableSelect }) => {
  const classes = useStyles();
  const [itemGroup, setItemGroup] = useState(0);
  const [selectGroup, setSelectGroup] = useState("");

  // Cambios segun el tamaño del dispositivo
  const [isMobile, setIsMovil] = useState(width === 'sm' || width === 'xs');

  const [servicesList, setServicesList] = useState(listServices);

  useEffect(() => {
    const screemSize = width === 'sm' || width === 'xs'
    setIsMovil(screemSize)
  }, [width])

  // useEffect(() => {
  //   onSelect(listGrupos[0].idGrupo)
  //   setSelectGroup(listGrupos[0])
  // }, [/*listGrupos,*/ onSelect])



  // const handleChange = (event, newValue) => {
  //   setItemGroup(newValue);
  //   const item = listGrupos[newValue]
  //   onSelect(item.idGrupo)
  //   setSelectGroup(item)
  // }

  useEffect(() => {
    setServicesList(listServices);
  }, [listServices])


  return (
    <div className={classes.root}>
      <Paper className={classes.boxCreateAtc}>
        {/* {!isMobile &&
          <div className={classes.sectionTitleTable}>
            <Typography component="div" variant="h5" className={classes.sectionTitleTableLeft}>
              LISTA DE EXAMENES DE {selectGroup.descripcion || ""}
            </Typography>
            <Typography className={classes.sectionTitleTableRigth} component="div" variant="h5">
              TIPOS DE EXÁMEN
            </Typography>
          </div>
        }
        <Divider /> */}
        <div className={classes.contentTable}>
          {
            !isMobile &&
            <TabPanel
              className={classes.tabplane}
              value={listServices || []}
              // groupSelect={selectGroup}
              tableSelect={tableSelect}
            />
          }
          {/* <Tabs
            value={itemGroup}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant="scrollable"
            onChange={handleChange}
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
            indicatorColor={'primary'}
            textColor='primary'
            scrollButtons="on"
          >
            {
              listGrupos && listGrupos.map((g, index) =>
                <Tab
                  key={g.idGrupo}
                  label={g.descripcion}
                  icon={<IconGroupExam Group={g.idGrupo} active={index === itemGroup || false} />}
                />
              )
            }
          </Tabs> */}
          {
            isMobile &&
            <TabPanel
              className={classes.tabplane}
              value={servicesList || []}
              groupSelect={selectGroup}
              tableSelect={tableSelect}
            />
          }
        </div>
      </Paper>
    </div>
  );
}

export default withWidth()(TableTarifa)
