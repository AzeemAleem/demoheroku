import driverTableMock from "./driverTableMock";
import MockUtils from "./mock.utils";

export default function mockCustomer(mock) {
  mock.onPost("api/customers").reply(({ data }) => {
    const { customer } = JSON.parse(data);
    const {
      name = "",
      address = "",
      phone='',
      email = "",
      city = "",
      country = "",
      vehicletype = "",
      vhno = "",
      rgno = "",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = customer;

    const id = generateUserId();
    const newCustomer = {
      id,
      name,
      address,
      phone,
      email,
      city,
      country,
      vehicletype,
      vhno,
      rgno,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    driverTableMock.push(newCustomer);
    return [200, { customer: newCustomer }];
  });

  mock.onPost("api/customers/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdCustomers = mockUtils.baseFilter(
      driverTableMock,
      queryParams
    );
    return [200, filterdCustomers];
  });

  mock.onPost("api/customers/deleteCustomers").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = driverTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        driverTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/customers/updateStatusForCustomers").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    driverTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/customers\/\d+/).reply(config => {
    const id = config.url.match(/api\/customers\/(\d+)/)[1];
    const customer = driverTableMock.find(el => el.id === +id);
    if (!customer) {
      return [400];
    }

    return [200, customer];
  });

  mock.onPut(/api\/customers\/\d+/).reply(config => {
    const id = config.url.match(/api\/customers\/(\d+)/)[1];
    const { customer } = JSON.parse(config.data);
    const index = driverTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    driverTableMock[index] = { ...customer };
    return [200];
  });

  mock.onDelete(/api\/customers\/\d+/).reply(config => {
    const id = config.url.match(/api\/customers\/(\d+)/)[1];
    const index = driverTableMock.findIndex(el => el.id === +id);
    driverTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = driverTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
