import DAO from './DAO';
import StockOpenCloseDTO from './../DTOs/StockOpenCloseDTO'

const StockOpenCloseDAO = new DAO('stockopenclose', StockOpenCloseDTO);

Window.StockOpenCloseDAO = StockOpenCloseDAO; // TODO: Remove this... debug only

export default StockOpenCloseDAO;