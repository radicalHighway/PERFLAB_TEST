import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage, SignInPage, SignUpPage, TaskPage } from "@/pages";
import { Layout } from "../layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
export function Router(): React.JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={CLIENT_ROUTES.HOME} element={<Layout />} >
                    <Route path={CLIENT_ROUTES.HOME} element={<HomePage />} />
                    <Route path={CLIENT_ROUTES.PRODUCTS} element={<ProductsPage />} />
                    <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
                    <Route path={CLIENT_ROUTES.TASKS} element={<TaskPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}