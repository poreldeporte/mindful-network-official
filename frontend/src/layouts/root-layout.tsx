import { Outlet } from "react-router-dom";
import { Topbar, Footer } from "@/components/shared";

export function RootLayout() {
  return (
    <>
      <Topbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
