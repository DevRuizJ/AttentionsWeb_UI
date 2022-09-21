import React from 'react'
import PropTypes from 'prop-types';

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
} from "../../../../../../assets/icons";

const IconGroupExam = (props) => {
    const { Group, active } = props;
    switch (Group) {
        case '0102': return (<PatologicaIcon active={active} />)
        case '0103': return (<BioMolecularIcon active={active} />)
        case '0104': return (<BioQuimicaIcon active={active} />)
        case '0105': return (<CoagulacionIcon active={active} />)
        case '0106': return (<HematologiaIcon active={active} />)
        case '0107': return (<InmunoquimicaIcon active={active} />)
        case '0108': return (<MicroBioIcon active={active} />)
        case '0109': return (<UrianalisisIcon active={active} />)
        case '0177': return (<GeneticaIcon active={active} />)
        default: return (<ScienceIcon active={active} />)
    }
    ;
}

IconGroupExam.propTypes = {
    Group: PropTypes.any.isRequired,
    active: PropTypes.any.isRequired,
};


export default IconGroupExam;