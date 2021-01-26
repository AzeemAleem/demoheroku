import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { OrdersFilter } from "./orders-filter/OrdersFilter";
import { OrdersTable } from "./orders-table/OrdersTable";
import { OrdersGrouping } from "./orders-grouping/OrdersGrouping";
import { useProductsUIContext } from "./OrdersUIContext";

export function OrdersCard() {
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newProductButtonClick: productsUIContext.newProductButtonClick,
      openDeleteProductsDialog: productsUIContext.openDeleteProductsDialog,
      openEditProductPage: productsUIContext.openEditProductPage,
      openUpdateProductsStatusDialog:
        productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title="Orders">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newProductButtonClick}
          >
            + Add Order
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrdersFilter />
        {productsUIProps.ids.length > 0 && (
          <>
            <OrdersGrouping />
          </>
        )}
        <OrdersTable />
      </CardBody>
    </Card>
  );
}
