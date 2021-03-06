import { Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../constants';

export const useStyles = makeStyles(() => ({
  container: {
    height: 'calc(100vh - 204px)',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
    paddingTop: 230,
  },
  image: {
    marginBottom: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.Black,
    marginBottom: 24,
  },
  content: {
    fontSize: 18,
    color: COLORS.Black,
    lineHeight: 3,
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: COLORS.Orange,
    marginRight: 24,
    '&:hover': {
      textDecoration: 'underline',
      color: COLORS.DarkOrange,
    },
  },
}));

export const NotFoundPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="sm">
      <Box className={classes.contentContainer} mt={25}>
        <Box className={classes.image}>
          <img alt="Logo 1" src="https://static.auto1.com/@auto1/auto1-platform/4.83.0/img/logo.png" />
        </Box>
        <Typography className={classes.header} variant="h2">
          404 - Not Found
        </Typography>
        <Typography className={classes.content}>
          Sorry, the page you are looking for does not exist
          {' '}
          <br />
          {'You can always go back to the '}
          <Link className={classes.link} to="/">homepage</Link>
        </Typography>
      </Box>
    </Container>
  );
};
