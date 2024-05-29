import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Barcode from "./barcode";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/barcode",
    element: <Barcode />
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}