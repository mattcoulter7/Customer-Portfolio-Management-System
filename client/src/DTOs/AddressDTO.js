import DTO from './DTO';

import SampleDTO from './SampleDTO';

class AddressDTO extends DTO {
    #country;
    #line1;
    #line2;
    #postcode;
    #city;
    #state;
    #sample;

    constructor(obj = {}){
        super(obj);
        this.#country = obj.country;
        this.#line1 = obj.line1;
        this.#line2 = obj.line2;
        this.#postcode = obj.postcode;
        this.#city = obj.city;
        this.#state = obj.state;
        this.#sample = new SampleDTO(obj.sample);
    }

    get country() {
        return this.#country;
    }
    set country(value){
        this.#country = value;
    }
    get line1() {
        return this.#line1;
    }
    set line1(value){
        this.#line1 = value;
    }
    get line2() {
        return this.#line2;
    }
    set line2(value){
        this.#line2 = value;
    }
    get postcode() {
        return this.#postcode;
    }
    set postcode(value){
        this.#postcode = value;
    }
    get city() {
        return this.#city;
    }
    set city(value){
        this.#city = value;
    }
    get state() {
        return this.#state;
    }
    set state(value){
        this.#state = value;
    }
    get sample() {
        return this.#sample;
    }
    set sample(value){
        this.#sample = value;
    }

    toJSON(){
        return {
            _id:this._id,
            country:this.country,
            line1:this.line1,
            line2:this.line2,
            postcode:this.postcode,
            city:this.city,
            state:this.state,
            sample:this.sample
        }
    }
}

Window.AddressDTO = AddressDTO; // TODO: Remove this... debug only

export default AddressDTO;