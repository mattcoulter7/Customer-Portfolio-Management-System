import DTO from './DTO';
import AddressDTO from './AddressDTO';

class CustomerDTO extends DTO {
    #firstName;
    #lastName;
    #createdAt;
    #DOB;
    #email;
    #phone;
    #address;

    constructor(obj = {}){
        super(obj);
        this.#firstName = obj.firstName;
        this.#lastName = obj.lastName;
        this.#createdAt = obj.createdAt;
        this.#DOB = obj.DOB;
        this.#email = obj.email;
        this.#phone = obj.phone;
        this.#address = new AddressDTO(obj.address);
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
    get address() {
        return this.#address;
    }
    set address(value){
        this.#address = value;
    }

    toJSON(){
        return {
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            createdAt:this.createdAt,
            DOB:this.DOB,
            email:this.email,
            phone:this.phone,
            address:this.address.toFilteredJSON()
        }
    }
}

Window.CustomerDTO = CustomerDTO; // TODO: Remove this... debug only

export default CustomerDTO;