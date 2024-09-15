import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import { QueryProvider } from "./providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryProvider>
    <Router />
  </QueryProvider>
);
