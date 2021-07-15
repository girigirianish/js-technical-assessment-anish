import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants';

export const useStyles = makeStyles(() => ({
  footerWrapper: {
    backgroundColor: 'white',
    boxShadow: 'none',
    height: 80,
    borderTop: '1px solid lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.Black,
  },
}));

export const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.footerWrapper} position="static">
      ©AUTO1 - 2021
    </AppBar>
  );
};
