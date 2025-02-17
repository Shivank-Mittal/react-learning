import { RootState } from "../store";
import { useSelector } from "react-redux";

export const useIsLoading = (): boolean => {
  return useSelector((state: RootState) => state.LoadReducer.isLoading);
};
