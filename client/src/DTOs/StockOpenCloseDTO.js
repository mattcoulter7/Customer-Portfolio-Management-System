import DTO from './DTO';

class StockOpenCloseDTO extends DTO {
    #afterHours;
    #close;
    #from;
    #high;
    #low;
    #open;
    #preMarket;
    #symbol;
    #volume;

    constructor(obj = {}){
        super(obj);
        this.#afterHours = obj.afterHours;
        this.#close = obj.close;
        this.#from = obj.from;
        this.#high = obj.high;
        this.#low = obj.low;
        this.#open = obj.open;
        this.#preMarket = obj.preMarket;
        this.#symbol = obj.symbol;
        this.#volume = obj.volume;
    }

    get afterHours() {
        return this.#afterHours;
    }
    get close() {
        return this.#close;
    }
    get from() {
        return this.#from;
    }
    get high() {
        return this.#high;
    }
    get low() {
        return this.#low;
    }
    get open() {
        return this.#open;
    }
    get preMarket() {
        return this.#preMarket;
    }
    get symbol() {
        return this.#symbol;
    }
    get volume() {
        return this.#volume;
    }

    toJSON(){
        return {
            _id:this._id,
            afterHours:this.afterHours,
            close:this.close,
            from:this.from,
            high:this.high,
            low:this.low,
            open:this.open,
            preMarket:this.preMarket,
            symbol:this.symbol,
            volume:this.volume
        }
    }
}

Window.StockOpenCloseDTO = StockOpenCloseDTO; // TODO: Remove this... debug only

export default StockOpenCloseDTO;