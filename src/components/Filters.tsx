import React, { useCallback, useState } from 'react';
import {
  Select, Button, MenuItem, Grid, InputLabel,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { makeFirstLetterUppercase } from '../utils';

import { CarsFilters, Manufacturer } from '../models';
import { COLORS } from '../constants';

interface FiltersProps {
  manufacturers: Manufacturer[],
  colors: string[],
  isLoading: boolean,
  initialFilters: CarsFilters,
  onSelect: (filterState: CarsFilters) => void;
}

export const useCardStyles = makeStyles(() => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    border: '1px solid',
    borderColor: COLORS.LightGrey,
  },
  selector: {
    border: '1px solid',
    borderColor: COLORS.LightGrey,
    fontSize: 16,
    padding: 8,
    marginBottom: 12,
    '&:focus': {
      backgroundColor: 'white',
    },
  },
  contentText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.Orange,
    textTransform: 'none',
    color: COLORS.LightGrey,
    marginTop: 24,
    width: 150,
    '&:focus': {
      backgroundColor: COLORS.DarkOrange,
    },
    '&:hover': {
      backgroundColor: COLORS.Orange,
    },
  },
  label: {
    fontSize: 12,
    marginBottom: 12,
  },
}));

export const Filters: React.FC<FiltersProps> = ({
  manufacturers = [],
  colors = [],
  initialFilters,
  onSelect,
  isLoading = false,
}: FiltersProps) => {
  const [filter, setFilter] = useState<CarsFilters>(initialFilters);
  const classes = useCardStyles();

  const handleSelect = useCallback((
    event: React.ChangeEvent<any>,
    field: keyof CarsFilters,
  ) => setFilter((prevState: CarsFilters) => ({
    ...prevState,
    [field]: event.target.value,
  })), []);

  const handleSubmit = (): void => {
    onSelect({
      manufacturer: filter.manufacturer === 'all' ? '' : filter.manufacturer,
      color: filter.color === 'all' ? '' : filter.color,
    });
  };

  return (
    <div className={classes.contentContainer}>
      <InputLabel className={classes.label}>Color</InputLabel>
      <Select
        disableUnderline
        disabled={isLoading}
        value={filter.color || 'all'}
        autoWidth
        className={classes.selector}
        data-testid="colors"
        onChange={(event) => handleSelect(event, 'color')}
      >
        <MenuItem key="all" value="all">All car colors</MenuItem>
        {colors.map((color, index) => (
          // Same here as not unique id found used index instead
          /* eslint-disable react/no-array-index-key */
          <MenuItem key={index} value={color}>{makeFirstLetterUppercase(color)}</MenuItem>))}
      </Select>
      <InputLabel className={classes.label}>Manufacturer</InputLabel>
      <Select
        disableUnderline
        disabled={isLoading}
        value={filter.manufacturer || 'all'}
        autoWidth
        className={classes.selector}
        data-testid="manufacturers"
        onChange={(event) => handleSelect(event, 'manufacturer')}
      >
        <MenuItem key="all" value="all">All manufacturers</MenuItem>
        {manufacturers.map((manufacturer, index) => (
          // Same here as not unique id found used index instead
          /* eslint-disable react/no-array-index-key */
          <MenuItem key={index} value={manufacturer.name}>{manufacturer.name}</MenuItem>))}
      </Select>

      <Grid container justifyContent="flex-end">
        <Button
          disabled={isLoading}
          className={classes.button}
          onClick={handleSubmit}
        >
          Filter
        </Button>
      </Grid>
    </div>
  );
};
