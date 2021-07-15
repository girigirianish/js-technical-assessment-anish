import { useHistory } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  CardContent,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { useFavourite } from '../hooks/useFavourite';
import { makeFirstLetterUppercase } from '../utils';
import { COLORS } from '../constants';

export const useStyles = makeStyles({
  contentContainer: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    maxHeight: 300,
    overflow: 'auto',
    border: '1px solid',
    borderColor: COLORS.LightGrey,
  },
  root: {
    display: 'flex',
    marginBottom: 12,
    padding: 12,
    minHeight: 75,
  },
  button: {
    fontSize: 12,
    padding: 0,
    textTransform: 'none',
    color: '#EA7F28',
    '&:focus': {
      backgroundColor: '#D37324',
    },
    marginRight: '16px',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 12,
    marginRight: 18,
    color: COLORS.Orange,
    '&:hover': {
      color: COLORS.DarkOrange,
    },
  },
  contentText: {
    fontSize: 14,
    color: COLORS.Black,
  },
  contentTextError: {
    fontSize: 14,
    color: 'red',
  },
  cardContent: {
    padding: '0 0 0 12px',
    margin: 'auto 0',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});

export const Favourites: React.FC = () => {
  const { getFavourites, setFavourite } = useFavourite();
  const itemClasses = useStyles();
  const favourites = getFavourites();
  const history = useHistory();

  if (!favourites?.length) {
    return null;
  }
  return (
    <div className={itemClasses.contentContainer}>
      <Typography>
        My favourites !
      </Typography>
      <List>
        {favourites.map((car, index) => (
          // NOTE I am using index here as I am not confident that stockNumber is unique or not,
          // Or are there any id that can be taken as unique
          /* eslint-disable react/no-array-index-key */
          <Card key={index} className={itemClasses.root} data-testid="car-item" variant="outlined" color="text.primary">
            <CardContent className={itemClasses.cardContent}>
              <Typography className={itemClasses.header} variant="h6" gutterBottom>
                {car.modelName}
              </Typography>
              <Typography className={itemClasses.contentText} variant="body2">
                {`Stock # ${car.stockNumber} - ${car.mileage && car.mileage.number} - ${car.mileage && car.mileage.unit} ${car.fuelType} - ${makeFirstLetterUppercase(car.color)}`}
              </Typography>
              <Button className={itemClasses.button} onClick={() => history.push(`/details/${car.stockNumber}`)}>
                <VisibilityIcon />
                <span>View</span>
              </Button>
              <Button className={itemClasses.button} onClick={() => setFavourite(car.stockNumber)}>
                <RemoveCircleOutlineIcon />
                <span>Remove</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </div>
  );
};
