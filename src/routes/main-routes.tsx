import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import CategoryPage from "../pages/categorypage/CategoryPage";
import TempPage from "../pages/TempPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: rootLoader,
        children: [],
    },
    {
        path: "/category",
        element: <CategoryPage />,
        loader: rootLoader,
        children: [
            {
                path: "team",
                element: <TempPage />,
                loader: teamLoader,
            },
        ],
    }
])