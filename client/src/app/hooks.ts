import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
