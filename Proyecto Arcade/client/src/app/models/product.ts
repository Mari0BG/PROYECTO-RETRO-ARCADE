export class Product {
    _id?: String;
    name: String;
    price: number;
    description: String;
    stock: number;
    category_id: String;
    provider_id: String;
    image: String;
    contpurchase: number;
    cancelproduct: boolean;

    constructor() {
        this.name='';
        this.price=0;
        this.description='';
        this.stock=0;
        this.category_id='';
        this.provider_id='';
        this.image='';
        this.contpurchase=0;
        this.cancelproduct=false;
    }
}