import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import productsAsyncThunk from "./redux/asyncThunks/productsAsyncThunk";
import { Switch, Route } from "react-router-dom";
//?pages
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import SinProduct from "./pages/SinProduct";
import HistoryPage from "./pages/HistoryPage";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(productsAsyncThunk());
  }, [dispatch]);
  console.log(state);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/products/:id" component={SinProduct} />
        <Route exact path="/history" component={HistoryPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
