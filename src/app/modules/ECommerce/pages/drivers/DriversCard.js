import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DriversFilter } from "./drivers-filter/DriversFilter";
import { DriversTable } from "./drivers-table/DriversTable";
import { DriversGrouping } from "./drivers-grouping/DriversGrouping";
import { useCustomersUIContext } from "./DriversUIContext";

export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
    };
  }, [customersUIContext]);

  return (
    
    <Card>
      <CardHeader title="Drivers List">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={customersUIProps.newCustomerButtonClick}
          >
            + Add Driver
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DriversFilter />
        {customersUIProps.ids.length > 0 && <DriversGrouping />}
        <DriversTable />
      </CardBody>
    </Card>
  );
}
