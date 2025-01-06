'use client';

import { Provider } from "react-redux";
import ReactQueryProvider from "@/query/QueryProvider";
import { ProductContext } from "@/context/Context";
import { store } from "@/store/store";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <ProductContext>
          {children}
        </ProductContext>
      </ReactQueryProvider>
    </Provider>
  );
};

export default ClientProviders;