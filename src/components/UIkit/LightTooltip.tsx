import React from 'react'
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: "white",
      color: 'black',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
}))(Tooltip);

export default LightTooltip
