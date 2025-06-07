import { createBrowserRouter } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import CategoryPage from "../pages/categorypage/CategoryPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../components/layouts/MainLayout";
import { getProductsByCategory } from "../data/categoryProducts";

const rootLoader: LoaderFunction = async () => {
    return null;
};

const categoryLoader: LoaderFunction = async ({ params }) => {
    const products = getProductsByCategory(params.categoryId || '', params.subCategoryId);
    return { categoryId: params.categoryId, products };
};

const productLoader: LoaderFunction = async ({ params }) => {
    const allProducts = getProductsByCategory(''); // Get all products
    const product = allProducts.find(p => p.slug === params.productSlug);
    if (!product) {
        throw new Error('Product not found');
    }
    return { product };
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "category/:categoryId",
                element: <CategoryPage />,
                loader: categoryLoader,
                errorElement: <ErrorPage />
            },
            {
                path: "category/:categoryId/:subCategoryId",
                element: <CategoryPage />,
                loader: categoryLoader,
                errorElement: <ErrorPage />
            },
            {
                path: "product/:productSlug",
                element: <ProductDisplayPage />,
                loader: productLoader,
                errorElement: <ErrorPage />
            }
        ]
    }
]);