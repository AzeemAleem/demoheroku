import React from "react";
import { Route } from "react-router-dom";
import { OrdersLoadingDialog } from "./orders-loading-dialog/OrdersLoadingDialog";
import { OrderDeleteDialog } from "./order-delete-dialog/OrderDeleteDialog";
import { OrdersDeleteDialog } from "./orders-delete-dialog/OrdersDeleteDialog";
import { OrdersFetchDialog } from "./orders-fetch-dialog/OrdersFetchDialog";
import { OrdersUpdateStatusDialog } from "./orders-update-status-dialog/OrdersUpdateStatusDialog";
import { OrdersCard } from "./OrdersCard";
import { ProductsUIProvider } from "./OrdersUIContext";

export function OrdersPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/e-commerce/products/new");
    },
    openEditProductPage: (id) => {
      history.push(`/e-commerce/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/e-commerce/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/e-commerce/products/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <OrdersLoadingDialog />
      <Route path="/e-commerce/products/deleteProducts">
        {({ history, match }) => (
          <OrdersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/:id/delete">
        {({ history, match }) => (
          <OrderDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/fetch">
        {({ history, match }) => (
          <OrdersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/updateStatus">
        {({ history, match }) => (
          <OrdersUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <OrdersCard />
    </ProductsUIProvider>
  );
}
