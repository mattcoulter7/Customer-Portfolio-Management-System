import DAO from './DAO';
import CustomerDTO from './../DTOs/CustomerDTO'

const CustomerDAO = new DAO('customer', CustomerDTO);

Window.CustomerDAO = CustomerDAO; // TODO: Remove this... debug only

export default CustomerDAO;