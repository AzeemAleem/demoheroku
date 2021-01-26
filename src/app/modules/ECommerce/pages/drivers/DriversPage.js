import React from "react";
import { Route } from "react-router-dom";
import { DriversLoadingDialog } from "./drivers-loading-dialog/DriversLoadingDialog";
import { DriverEditDialog } from "./driver-edit-dialog/DriverEditDialog";
import { DriverDeleteDialog } from "./driver-delete-dialog/DriverDeleteDialog";
import { DriversDeleteDialog } from "./drivers-delete-dialog/DriversDeleteDialog";
import { DriversFetchDialog } from "./drivers-fetch-dialog/DriversFetchDialog";
import { DriversUpdateStateDialog } from "./drivers-update-status-dialog/DriversUpdateStateDialog";
import { CustomersUIProvider } from "./DriversUIContext";
import { CustomersCard } from "./DriversCard";

export function DriversPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push("/e-commerce/drivers/new");
    },
    openEditCustomerDialog: (id) => {
      history.push(`/e-commerce/drivers/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/e-commerce/drivers/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/e-commerce/drivers/deleteCustomers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/e-commerce/drivers/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/e-commerce/drivers/updateStatus");
    }
  }

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <DriversLoadingDialog />
      <Route path="/e-commerce/drivers/new">
        {({ history, match }) => (
          <DriverEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/drivers/:id/edit">
        {({ history, match }) => (
          <DriverEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/drivers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/drivers/deleteCustomers">
        {({ history, match }) => (
          <DriversDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/drivers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/drivers/:id/delete">
        {({ history, match }) => (
          <DriverDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/drivers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/drivers/fetch">
        {({ history, match }) => (
          <DriversFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/drivers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/drivers/updateStatus">
        {({ history, match }) => (
          <DriversUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/drivers");
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
