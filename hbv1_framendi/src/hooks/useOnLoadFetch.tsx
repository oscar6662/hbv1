import { useRef, useEffect, useReducer } from 'react';

interface State<T> {
  data?: T;
  fetch_data?: () => T;
  loading?: boolean;
  error?: Error;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

const useOnLoadFetch = <T = unknown,>(
  url?: string,
  options?: RequestInit
): State<T> => {
  const cancelRequest = useRef<boolean>(false);

  const initial: State<T> = {
    data: undefined,
    error: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initial, loading: true };
      case 'fetched':
        return { ...initial, data: action.payload };
      case 'error':
        return { ...initial, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initial);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = (await res.json()) as T;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (err) {
        dispatch({ type: 'error', payload: err as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
};

export default useOnLoadFetch;
