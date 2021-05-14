import { useEffect } from 'react';
import Router from 'next/router';
import { qs } from '../utils';

export const useAutoNext = (isEnded: boolean, page: number) => {
  useEffect(() => {
    if (isEnded) {
      const search = qs();
      window.scrollTo(0, 0);
      Router.push({
        pathname: window.location.pathname,
        query: {
          ...search,
          page,
        },
      });
    }
  }, [isEnded, page]);
};

export default useAutoNext;
