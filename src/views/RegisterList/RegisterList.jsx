import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import RegisterFilter from './RegisterFilter';

/*************REDUX **********************/
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { actionCreators } from "../../store/Atencion";
import { actionCreators as actionCreatorsUser } from "../../store/User";
import { AtencionesTable } from 'views/Atenciones/components';
/*************REDUX *********************/

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingTop: "3px",
    },
    content: {
        // marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    title: {
        margin: theme.spacing(2, 0),
    },
    boxCreateAtc: {
        margin: theme.spacing(2, 0),
    },
    subtitle: {
        margin: theme.spacing(2, 0),
    },

    gridButton: {
        textAlign: 'center',
        margin: theme.spacing(1, 0),
        padding: theme.spacing(1),
    },
    button: {
        // border: "1px solid",
        lineHeight: 2,
        marginLeft: "auto",
        margin: theme.spacing(1, 0),
        borderRadius: "0.5rem",
        justifyContent: "center",
        // width: "100%",
    },
    bot: {
        fontSize: '120px'
    }
}));



const RegisterList = (props) => {

    //store
    const { atencion, getLitsAtentionGenerated } = props;

    //agregar diseño
    const classes = useStyles();

    //Seteo la compañia seleccinada
    const [codigoCompania, setCodigoCompania] = useState('');

    //Estado de control para Sucursal
    const [branchOffice, setBranchOffice] = useState('');

    //Estado de control para la Lista de Atenciones que se envían a la tabla
    const [dataList, setDataList] = useState([]);


    const handleAttentionList = () => {

        getLitsAtentionGenerated({
            "compania": codigoCompania,
            "sucursal": branchOffice
        });
    }

    useEffect(() => {
        setDataList(atencion.dataListAttention)
    }, [atencion])

    

    return (
        <div className={classes.root}>

            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h4" component="h4" className={classes.title}>
                        REGISTROS GENERADOS
                    </Typography>
                </Grid>
                <RegisterFilter
                    setCodigoCompania={setCodigoCompania}
                    setBranchOffice={setBranchOffice}
                    handleAttentionList={handleAttentionList}
                />
                {
                    dataList != '' && (
                        <div className={classes.content}  style={{ width: '100%' }}>
                            <AtencionesTable
                                dataAttentionList={dataList}
                            />
                        </div>
                    )
                }
            </Grid>

        </div>

    )
};

const mapStateToProps = state => ({
    atencion: state.atencion,
    userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            ...actionCreators,
            ...actionCreatorsUser,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterList)