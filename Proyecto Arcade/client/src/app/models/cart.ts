export class Cart {
    _id: string;
    _idClient: string;
    products: {
      _idProduct: string;
      price: number;
      amount: number;
      nameProduct: string;
      imageProduct: string;
      category_id: string;
    }[] = [];

    constructor(){
        this._id = "";
        this._idClient = "";
    }
}
