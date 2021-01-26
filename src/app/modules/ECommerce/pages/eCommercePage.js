import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
import { DriversPage } from "./drivers/DriversPage";
import { OrdersPage } from "./products/OrdersPage";
import { OrderEdit } from "./products/order-edit/OrderEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/e-commerce"
            to="/e-commerce/customers"
          />
        }
        <ContentRoute path="/e-commerce/customers" component={CustomersPage} />
        <ContentRoute path="/e-commerce/products/new" component={OrderEdit} />
        <ContentRoute
          path="/e-commerce/products/:id/edit"
          component={OrderEdit}
        />

        <ContentRoute path="/e-commerce/drivers" component={DriversPage} />
        <ContentRoute path="/e-commerce/products" component={OrdersPage} />

      </Switch>
    </Suspense>
  );
}
