import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants';

export const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    height: 80,
    borderBottom: '1px solid',
    borderBottomColor: COLORS.LightGrey,
    marginBottom: 24,
    justifyContent: 'center',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  logo: {
    width: 180,
    height: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: COLORS.Black,
    marginRight: 24,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Box ml={5}>
          <Link to="/">
            <img
              className={classes.logo}
              src="https://static.auto1.com/@auto1/auto1-platform/4.83.0/img/logo.png"
              alt="Logo"
            />
          </Link>
        </Box>
        <Box>
          <Link className={classes.link} to="" color="inherit">Purchase</Link>
          <Link className={classes.link} to="" color="inherit">My order</Link>
          <Link className={classes.link} to="" color="inherit">Sell</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
