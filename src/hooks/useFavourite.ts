import { useEffect, useState } from 'react';
import { Car } from '../models';
import { carService, localStorageService } from '../services';
import { useFetching } from './useFetching';

const favoriteStore: { [stockNumber: string]: Car } = {};

function favoritesTobeLoaded(ids: string[]): string[] {
  const loaded = new Set(Object.keys(favoriteStore));
  return ids.filter((id) => !loaded.has(id));
}

function getFavoritesFromStorage(): string[] {
  const favorites = localStorageService.get('favoriteLocalStore');
  if (!favorites) {
    return [];
  }
  let favoriteIds: string[] = [];
  try {
    favoriteIds = JSON.parse(favorites);
  } catch {}
  return favoriteIds;
}

function saveInStore(id: number): void {
  const data = getFavoritesFromStorage();
  const idToString = String(id);
  const dataToSave = data.includes(idToString)
    ? data.filter((favId) => favId !== idToString)
    : data.concat(idToString);
  localStorageService.set('favoriteLocalStore', JSON.stringify(dataToSave));
}

export function useFavourite(): {
  setFavourite: (stockNumber: number) => void;
  getFavourites: () => Car[];
  isFavourite: (stockNumber: number) => boolean;
  isFavoriteLoading: boolean;
  } {
  const [shouldLoad, setShouldLoad] = useState(true);
  const [favoritesToLoad, setFavoritesToLoad] = useState<string[]>([]);

  function setFavourite(stockNumber: number): void {
    if (Number(stockNumber) in favoriteStore) {
      delete favoriteStore[stockNumber];
    }
    saveInStore(stockNumber);
    setShouldLoad(true);
  }

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }
    const favoriteIds = favoritesTobeLoaded(getFavoritesFromStorage());
    if (favoriteIds && favoriteIds.length) {
      setFavoritesToLoad(favoriteIds);
    }
    setShouldLoad(false);
  }, [shouldLoad]);

  const loadFavorites = useFetching(async () => {
    const promises = favoritesToLoad.map(
      (stockNumber) => carService.getCarByStockNumber(Number(stockNumber)),
    );
    const carsResults = await Promise.allSettled(promises);
    const allValues = carsResults
      .filter((c) => c.status === 'fulfilled')
      .map((c) => <PromiseFulfilledResult<Car>>c)
      .map((c) => c.value);
    allValues.forEach((car) => {
      favoriteStore[car.stockNumber] = car;
    });
  }, null, [favoritesToLoad]);

  function getFavourites(): Car[] {
    return Object.values(favoriteStore);
  }

  function isFavourite(stockNumber: number): boolean {
    return stockNumber in favoriteStore;
  }

  return {
    setFavourite, getFavourites, isFavourite, isFavoriteLoading: loadFavorites.isLoading,
  };
}
