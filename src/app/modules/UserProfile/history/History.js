import React from "react";
import { Route } from "react-router-dom";
import { OrdersLoadingDialog } from "./orders-loading-dialog/OrdersLoadingDialog";
import { OrderDeleteDialog } from "./order-delete-dialog/OrderDeleteDialog";
import { OrdersDeleteDialog } from "./orders-delete-dialog/OrdersDeleteDialog";
import { OrdersFetchDialog } from "./orders-fetch-dialog/OrdersFetchDialog";
import { OrdersUpdateStatusDialog } from "./orders-update-status-dialog/OrdersUpdateStatusDialog";
import { HistoryOrdersCard } from "./HistoryOrdersCard";
import { ProductsUIProvider } from "./HistoryOrdersUIContext";

export default function History({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/user-profile/history/new");
    },
    openEditProductPage: (id) => {
      history.push(`/user-profile/history/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/user-profile/history/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/user-profile/history/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/user-profile/history/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/user-profile/history/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <OrdersLoadingDialog />
      <Route path="/user-profile/history/deleteProducts">
        {({ history, match }) => (
          <OrdersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/user-profile/history");
            }}
          />
        )}
      </Route>
      <Route path="/user-profile/history/:id/delete">
        {({ history, match }) => (
          <OrderDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/user-profile/history");
            }}
          />
        )}
      </Route>
      <Route path="/user-profile/history/fetch">
        {({ history, match }) => (
          <OrdersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/user-profile/history");
            }}
          />
        )}
      </Route>
      <Route path="/user-profile/history/updateStatus">
        {({ history, match }) => (
          <OrdersUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/user-profile/history");
            }}
          />
        )}
      </Route>
      <HistoryOrdersCard />
    </ProductsUIProvider>
  );
}
