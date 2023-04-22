export default class OptionValueConstructor {
    constructor (_id, value, quantity, price) {
        this.id = Math.random() * 100;
        this._id = _id;
        this.value = value;             
        this.quantity = quantity;
        this.price = price
    }
}