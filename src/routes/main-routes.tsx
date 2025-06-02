import { createBrowserRouter } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import CategoryPage from "../pages/categorypage/CategoryPage";
import MainLayout from "../components/layouts/MainLayout";

const rootLoader: LoaderFunction = async () => {
    return null;
};

const categoryLoader: LoaderFunction = async ({ params }) => {
    return { categoryId: params.categoryId };
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "category/:categoryId",
                element: <CategoryPage />,
                loader: categoryLoader,
            },
            {
                path: "category/:categoryId/:subCategoryId",
                element: <CategoryPage />,
                loader: categoryLoader,
            }
        ]
    }
]);