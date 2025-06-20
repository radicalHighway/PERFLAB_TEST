import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage/ui/ProductsPage';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '../layout/Layout';

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.HOME} element={<Layout />}>
          <Route path={CLIENT_ROUTES.HOME} element={<HomePage />} />
          <Route path={CLIENT_ROUTES.PRODUCTS} element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
