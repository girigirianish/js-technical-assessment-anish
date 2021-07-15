import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';

import { makeFirstLetterUppercase } from '../utils';
import BrokenImagePicture from '../assets/broken-image.png';
import { COLORS } from '../constants';
import { Car } from '../models';

interface CarsItemProps {
  car: Car
}

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginBottom: 12,
    padding: 12,
    minHeight: 75,
    borderColor: COLORS.LightGrey,
  },
  picture: {
    width: 60,
    height: 'auto',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 12,
    color: COLORS.Orange,
    '&:hover': {
      color: COLORS.DarkOrange,
    },
  },
  contentText: {
    fontSize: 14,
    color: COLORS.Black,
  },
  cardContent: {
    padding: '0 0 0 12px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cardContentImage: {
    padding: 8,
    display: 'flex',
    width: 60,
    alignItems: 'center',
    backgroundColor: COLORS.LightGrey,
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
});

function getFallbackImage(ev: React.SyntheticEvent<HTMLImageElement, Event>): void {
  (ev.target as HTMLImageElement).src = BrokenImagePicture;
}

export const CarsItem: React.FC<CarsItemProps> = ({ car }: CarsItemProps) => {
  const classes = useStyles();
  if (!car) {
    return null;
  }
  return (
    <Card className={classes.root} data-testid="car-item" variant="outlined" color="text.primary">
      <CardContent className={classes.cardContentImage}>
        <CardMedia
          component={() => (
            <img alt="Car Preview" onError={getFallbackImage} className={classes.cardImage} src={car.pictureUrl} />)}
          className={classes.picture}
        />
      </CardContent>

      <CardContent className={classes.cardContent}>
        <Typography className={classes.header} variant="h6" gutterBottom>
          {car.modelName}
        </Typography>
        <Typography className={classes.contentText} variant="body2">
          {`Stock # ${car.stockNumber} - ${car.mileage.number} - ${car.mileage.unit} ${car.fuelType} - ${makeFirstLetterUppercase(car.color)}`}
        </Typography>
        <Link className={classes.linkText} component={RouterLink} to={`/details/${car.stockNumber}`}>
          View details
        </Link>

      </CardContent>
    </Card>
  );
};
