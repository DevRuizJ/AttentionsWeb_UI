import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import React from 'react'
import ExamTable from 'views/Tariff/components/ExamTable';


const TabPanel = (props) => {
    const { value, /*groupSelect,*/ tableSelect } = props;
    return (
        <div
            role="tabpanel"
            id={`vertical-tabpanel`}
            aria-labelledby={`vertical-tab`}
            style={{ width: "100%" }}
        >
            <Box>
                {
                    value
                        ?
                        <ExamTable data={value} /*groupSelect={groupSelect}*/ tableSelect={tableSelect} />
                        : <div>Cargando...</div>
                }
            </Box>
        </div>
    );
}

TabPanel.propTypes = {
    value: PropTypes.any.isRequired,
};

export default TabPanel;
