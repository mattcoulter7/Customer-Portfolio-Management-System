import DAO from './DAO';
import CustomerDTO from './../DTOs/CustomerDTO'

Window.CustomerDAO = new DAO('customer', CustomerDTO);

export default Window.CustomerDAO;