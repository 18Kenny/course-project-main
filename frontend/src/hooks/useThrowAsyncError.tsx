import {useCallback, useState} from "react";

export const useThrowAsyncError = () => {
  const [, setError] = useState<Error | null>(null);

  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
};
