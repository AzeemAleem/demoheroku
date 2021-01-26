// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  phone: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Phone is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string()
    .nullable(false)
    .required("City is required"),
  country: Yup.string().required("Country is required"),
});


export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          console.log(values);
          saveCustomer(values);

        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone Number"
                    />
                  </div>
                  {/* Login */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <Field
                      name="city"
                      component={Input}
                      placeholder="City"
                      label="City"
                    />
                    {/* <DatePickerField
                      name="dateOfBbirth"
                      label="Date of Birth"
                    /> */}
                  </div>
                  {/* IP Address */}
                  <div className="col-lg-4">
                    <Field
                      name="country"
                      component={Input}
                      placeholder="Country"
                      label="Country"

                    />
                  </div>
                </div>
              </Form>
              {/* <div className="form-group row"> */}
              {/* Gender */}
              {/* <div className="col-lg-4">
                    <Select name="Gender" label="Gender">
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </Select>
                  </div> */}
              {/* Type */}
              {/* <div className="col-lg-4">
                    <Select name="type" label="Type">
                      <option value="0">Business</option>
                      <option value="1">Individual</option>
                    </Select>
                  </div> */}
              {/* </div> */}

            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
