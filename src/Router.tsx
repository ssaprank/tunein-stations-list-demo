import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error404Page, HomePage } from "./pages";
import { StationDetailsPage } from "./pages/StationDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error404Page />,
  },
  {
    path: "/station/:stationId",
    element: <StationDetailsPage />,
    errorElement: <Error404Page />,
  },
  {
    path: "/404",
    element: <Error404Page />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
