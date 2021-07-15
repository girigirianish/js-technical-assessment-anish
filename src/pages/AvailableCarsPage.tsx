import {
  CircularProgress, Container, Grid, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CarsList } from '../components/CarsList';
import { Favourites } from '../components/FavouriteList';
import { Filters } from '../components/Filters';
import { useFetching, useGlobalState } from '../hooks';
import { COLORS } from '../constants';
import {
  StringMap,
  Car, CarsApiResponse, CarsFilters, Manufacturer,
} from '../models';
import { manufacturersService } from '../services/manufacturers.service';
import { colorsService } from '../services/colors.service';
import { removeEmptyPropertiesFromObj } from '../utils';
import { carService } from '../services/car.service';
import { ErrorMessage } from '../components/ErrorMessage';

const useStyles = makeStyles({
  listHeader: {
    fontSize: 18,
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  listCarsNumber: {
    fontSize: 18,
    color: COLORS.Orange,
  },
  spinner: {
    color: COLORS.Orange,
  },
});

export const AvailableCars: React.FC = () => {
  const { dispatch, state } = useGlobalState();
  const {
    filters,
    currentPage,
    totalPageCount,
    totalCarsCount,
    manufacturers,
    colors,
    cars,
  } = state;

  const manufacturersAndColors = { manufacturers, colors };

  const classes = useStyles();

  async function fetchCars(): Promise<CarsApiResponse> {
    const carsApiReponse = await carService.getCars({
      ...removeEmptyPropertiesFromObj(filters as StringMap),
      page: currentPage as number,
    });
    dispatch(carsApiReponse);
    return carsApiReponse;
  }

  async function fetchManufacturersAndColors()
  : Promise<{ manufacturers: Manufacturer[], colors: string[] }> {
    const [manufacturersData, colorsData] = await Promise.all([
      manufacturersService.getManufacturers(),
      colorsService.getColors(),
    ]);
    dispatch({ manufacturers: manufacturersData, colors: colorsData });
    return { manufacturers: manufacturersData, colors: colorsData };
  }

  const carsState = useFetching(() => fetchCars(), null, [filters, currentPage]);

  const manufacturersAndColorsState = useFetching(() => {
    if (
      manufacturersAndColors
      && manufacturersAndColors.manufacturers
      && manufacturersAndColors.manufacturers.length
      && manufacturersAndColors.colors
      && manufacturersAndColors.colors.length
    ) {
      return null;
    }
    return fetchManufacturersAndColors();
  }, { manufacturers: [], colors: [] }, []);

  if (manufacturersAndColorsState.error || carsState.error) {
    return (
      <Container maxWidth="lg">
        <ErrorMessage message="Something bad has happened. Please try again later." />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item sm={5} xs={12} md={5} lg={4}>
          <Filters
            initialFilters={filters as CarsFilters}
            isLoading={carsState.isLoading || manufacturersAndColorsState.isLoading}
            manufacturers={manufacturersAndColors.manufacturers as Manufacturer[]}
            colors={manufacturersAndColors.colors as string[]}
            onSelect={(currentfilters: CarsFilters) => dispatch({ filters: currentfilters })}
          />
          <Favourites />
        </Grid>
        <Grid item sm={7} xs={12} md={7} lg={7}>
          <Typography className={classes.listHeader} gutterBottom>
            Available cars
          </Typography>
          <Typography className={classes.listCarsNumber} gutterBottom>
            {carsState.isLoading ? '...Loading...'
              : `Showing ${totalCarsCount && totalCarsCount > 10 ? `10 of ${totalCarsCount}` : `${totalCarsCount}`} result`}
          </Typography>
          {carsState.isLoading && <CircularProgress className={classes.spinner} />}
          <CarsList
            list={cars as Car[]}
            page={currentPage as number}
            totalPageCount={totalPageCount as number}
            isLoading={carsState.isLoading}
            onPageSelect={(pageNumber: number) => dispatch({ currentPage: pageNumber })}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
