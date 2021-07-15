import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { CarsList } from './CarsList';
import { MOCK_CAR_DATA } from './mock-car-data';

describe('CarsList component', () => {
  it('should render list of elements correctly when list is not empty', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <CarsList
          isLoading={false}
          list={MOCK_CAR_DATA.cars}
          totalPageCount={100}
          page={1}
          onPageSelect={jest.fn()}
        />
      </BrowserRouter>,
    );
    const result = getAllByTestId('car-item');
    expect(result.length).toBe(MOCK_CAR_DATA.cars.length);
  });

  it('should return null if  cars list is empty', () => {
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <CarsList
          isLoading={false}
          list={[]}
          page={1}
          totalPageCount={100}
          onPageSelect={jest.fn()}
        />
      </BrowserRouter>,
    );
    const result = queryAllByTestId('car-item');
    expect(result.length).toBe(0);
  });

  it('should call onPageSelect when click on Pagination button', () => {
    const pageSelectHandler = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <CarsList
          isLoading={false}
          list={MOCK_CAR_DATA.cars}
          totalPageCount={100}
          onPageSelect={pageSelectHandler}
          page={1}
        />
      </BrowserRouter>,
    );
    const pageButton = getByText('3', { selector: 'button' });
    fireEvent.click(pageButton);
    expect(pageSelectHandler).toHaveBeenCalledWith(3);
  });
});
