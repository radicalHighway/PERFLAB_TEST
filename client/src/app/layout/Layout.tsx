import { Header, Footer } from "@/widgets";
import { Outlet } from "react-router";

export function Layout(): React.JSX.Element {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}