import { useCallback } from 'react';
import { List } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import { CarsItem } from './CarItem';
import CarItemPlaceholder from './CarItemPlaceholder';
import { Car } from '../models';

interface CarsListProps {
  list: Car[];
  page: number;
  isLoading: boolean;
  totalPageCount: number;
  onPageSelect: (value: number) => void;
}

const useStyles = makeStyles({
  list: {
    paddingBottom: 12,
  },
  paginatorContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const CarsList: React.FC<CarsListProps> = ({
  list, page, isLoading, totalPageCount, onPageSelect,
}: CarsListProps) => {
  const classes = useStyles();
  const handleChange = useCallback(
    (_, selectedPage: number) => onPageSelect(selectedPage), [onPageSelect],
  );
  if (isLoading) {
    return (
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          // Here we have to user index as we need some static ghost elements
          /* eslint-disable react/no-array-index-key */
          <CarItemPlaceholder key={index} />
        ))}
      </List>
    );
  }
  return (
    <List className={classes.list}>
      {list.map((carRow, index) => (
        <CarsItem car={carRow} key={index} />
      ))}
      <Pagination
        className={classes.paginatorContainer}
        count={totalPageCount}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </List>
  );
};
