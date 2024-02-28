export class Rating {

    _id?: String;
    _idProduct: String;
    _idUser: String;
    username:String
    userimg: String
    rating: String;
    coment: String;
    createdAt?: any;

    constructor(){

        this._idProduct=""
        this._idUser=""
        this.rating=""
        this.coment=""
        this.username=""
        this.userimg=""
    }

}
