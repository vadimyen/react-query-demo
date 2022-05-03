import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { Users } from "./components/Users";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
