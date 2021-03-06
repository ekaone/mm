import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import Navigator from '../Navigator/Navigator';
import Header from '../Header/Header';
import { 
  categoriesListItem,
  tabLabelsLabour,
  tabLabelsInspection,
  tabLabelsStorage,
  tabLabelsLocation,
  tabLabelsFunctions,
  tabLabelsVehicle,
  tabLabelsAnalytics,
  tabLabelsPerformance,
  tabLabelsTestLab
} from './data'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" style={{ textDecoration: 'none', color: '#3f51b5' }}>
        EMS Adiraja Integrasi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

const categories = [
  { id: 0, catName: 'Labour', component: tabLabelsLabour },
  { id: 1, catName: 'Inspection', component: tabLabelsInspection },
  { id: 3, catName: 'Storage', component: tabLabelsStorage },
  { id: 4, catName: 'Location', component: tabLabelsLocation },
  { id: 5, catName: 'Functions', component: tabLabelsFunctions },
  { id: 6, catName: 'Vehicle', component: tabLabelsVehicle },
  { id: 7, catName: 'Analytics', component: tabLabelsAnalytics },
  { id: 8, catName: 'Performance', component: tabLabelsPerformance },
  { id: 9, catName: 'Test Lab', component: tabLabelsTestLab },
]

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [index, setIndex] = useState(0)
  const [tabLabels, setTabLabels] = useState(tabLabelsLabour)
  const [titleHeader, setTitleHeader] = useState('Labour')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickTab = (id) => {
    setIndex(id)
  }

  const setContent = (idx) => {
    const c = tabLabels.find(c => c.id === idx ? c.label : null)
    return c.content
  }

  const handleClickChildren = (childId) => {
    const c = categories.find(c => c.catName === childId)
    setTabLabels(c.component)
    setIndex(0)
    setTitleHeader(c.catName)
    setMobileOpen(!mobileOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              handlerChildrenClick={handleClickChildren}
              categories={categoriesListItem}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator 
              PaperProps={{ style: { width: drawerWidth } }} 
              handlerChildrenClick={handleClickChildren}
              categories={categoriesListItem}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header 
            title={titleHeader}
            onDrawerToggle={handleDrawerToggle}
            tabLabels={tabLabels}
            index={index}
            handlerClickTab={handleClickTab}
          />
          <main className={classes.main}>
            { setContent(index) }
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
