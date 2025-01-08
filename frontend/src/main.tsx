import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProSidebarProvider } from "react-pro-sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </StrictMode>
);
