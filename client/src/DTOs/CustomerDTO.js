import DTO from './DTO';

/*
    customer table
        firstName: String
        lastName: String
        createdAt: Date
        DOB: Date
        email: String
        phone: String
        addressid: String 123456789

    address table
        id: 123456789
        street: 1 John Street
        city: Melbourne
        suburb: Hawthorn
        state: VIC
        postcode: 
*/

Window.CustomerDTO = class Customer extends DTO {
    #_id;
    #firstName;
    #lastName;
    #createdAt;
    #DOB;
    #email;
    #phone;
    #addressid;

    constructor(obj){
        super(obj);
        this.#_id = obj._id;
        this.#firstName = obj.firstName;
        this.#lastName = obj.lastName;
        this.#createdAt = obj.createdAt;
        this.#DOB = obj.DOB;
        this.#email = obj.email;
        this.#phone = obj.phone;
        this.#addressid = obj.addressid;
    }

    get _id(){
        return this.#_id;
    }
    get firstName() {
        return this.#firstName;
    }
    set firstName(value){
        this.#firstName = value;
    }
    get lastName() {
        return this.#lastName;
    }
    set lastName(value){
        this.#lastName = value;
    }
    get DOB() {
        return this.#DOB;
    }
    set DOB(value){
        this.#DOB = value;
    }
    get email() {
        return this.#email;
    }
    set email(value){
        this.#email = value;
    }
    get phone() {
        return this.#phone;
    }
    set phone(value){
        this.#phone = value;
    }
    get createdAt() {
        return this.#createdAt;
    }
    set createdAt(value){
        this.#createdAt = value;
    }
    get createdAtDate(){
        return new Date(this.createdAt);
    }
    set createdAtDate(value){
        this.#createdAt = value.toISOString();
    }
    get addressid() {
        return this.#addressid;
    }
    set addressid(value){
        this.#addressid = value;
    }

    toJSON(){
        return {
            _id:this._id,
            firstName:this.#firstName,
            lastName:this.#lastName,
            createdAt:this.#createdAt,
            DOB:this.#DOB,
            email:this.#email,
            phone:this.#phone,
            addressid:this.#addressid
        }
    }
}

export default Window.CustomerDTO;