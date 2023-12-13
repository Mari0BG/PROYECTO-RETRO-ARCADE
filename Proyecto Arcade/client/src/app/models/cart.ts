export class Cart {
    _id: String;
    _idProduct: String;
    _idClient: String;
    description: String;
    price: number;
    amount: number;
    nameProduct: String;
    imageProduct: String;
    category_id: String;

    constructor(){
        this._id = "";
        this._idProduct = "";
        this._idClient = "";
        this.description = "";
        this.price = 0;
        this.amount = 0;
        this.nameProduct = "";
        this.imageProduct = "";
        this.category_id = "";
    }
}
