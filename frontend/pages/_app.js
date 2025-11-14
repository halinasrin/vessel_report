import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const qcRef = useRef();
  if (!qcRef.current) qcRef.current = new QueryClient();
  return (
    <QueryClientProvider client={qcRef.current}>
      <Navbar />
      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
