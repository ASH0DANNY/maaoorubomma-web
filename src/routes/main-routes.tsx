import { createBrowserRouter } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import CategoryPage from "../pages/categorypage/CategoryPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import { SearchPage } from "../pages/SearchPage";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../components/layouts/MainLayout";
import { getProductsByCategory } from "../data/CategoryProducts";

const rootLoader: LoaderFunction = async () => {
  return null;
};

const categoryLoader: LoaderFunction = async ({ params }) => {
  const products = getProductsByCategory(
    params.categoryId || "",
    params.subCategoryId
  );
  return { categoryId: params.categoryId, products };
};

const productLoader: LoaderFunction = async ({ params }) => {
  const allProducts = getProductsByCategory(""); // Get all products
  const product = allProducts.find((p) => p.slug === params.productSlug);
  if (!product) {
    throw new Error("Product not found");
  }
  return { product };
};

const searchLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const products = getProductsByCategory(""); // Get all products for search
  return { query, products };
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
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: "category/:categoryId",
        element: <CategoryPage />,
        loader: categoryLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "category/:categoryId/:subCategoryId",
        element: <CategoryPage />,
        loader: categoryLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "product/:productSlug",
        element: <ProductDisplayPage />,
        loader: productLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
