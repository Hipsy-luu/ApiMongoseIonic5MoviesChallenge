/* import bcrypt from "bcrypt"; */

export class User {
    idUser: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    salt: string;

    constructor() {
        this.idUser = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.phone = "";
        this.password = "";
        this.salt = "";
    }
    
    /* createPass(){
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return ;
    
            bcrypt.hash(this.password, salt, (err, hash) => {
    
                if(err) return ;
                this.password = hash;
                this.salt = salt;
            });
        });
    } */
}