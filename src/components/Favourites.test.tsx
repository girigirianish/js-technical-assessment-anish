import {
  render, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Favourites } from './FavouriteList';
import { MOCK_CAR_DATA } from './mock-car-data';

const mockUseFavourites = {
  getFavourites: jest.fn(() => MOCK_CAR_DATA.cars),
  setFavourite: jest.fn(),
};

jest.mock('../hooks/useFavourite.ts', () => ({
  useFavourite: () => mockUseFavourites,
}));

describe('Filters component', () => {
  it('should render favorites list with from the array of the fixtures', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <Favourites />
      </BrowserRouter>,
    );

    const result = queryAllByText(/stock/i);
    expect(result).toHaveLength(10);
  });

  it('should call setFavorite with a proper id', () => {
    const getFavoriteImplementation = (): any => ([MOCK_CAR_DATA.cars[0], { stockNumber: 1010, error: 'someerror' }] as any);
    mockUseFavourites.getFavourites.mockImplementationOnce(getFavoriteImplementation);

    const { queryAllByText } = render(
      <BrowserRouter>
        <Favourites />
      </BrowserRouter>,
    );

    const button = queryAllByText(/remove/i);
    fireEvent.click(button[0]);
    expect(mockUseFavourites.setFavourite).toHaveBeenCalledWith(MOCK_CAR_DATA.cars[0].stockNumber);
  });
});
