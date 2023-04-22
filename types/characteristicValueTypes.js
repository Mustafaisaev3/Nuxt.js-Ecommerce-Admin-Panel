export default class CharacteristicValueConstructor {
    constructor (_id, characteristic, text) {
        this.id = Math.random() * 100;
        this._id = _id;
        this.characteristic = characteristic;             
        this.text = text;
    }
}