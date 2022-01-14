import { Interesting } from "./Interesting";

export class User {
    constructor(
        public id:any,
        public dob:Date,
        public email:String,
        public firstname:String,
        public lastname:String,
        public password:String,
        public role:String,
        public age:String ,
        public gender:String,
        public interestings:any[] ,
        public regd:Date,
        public empStatus:String
            ){}
   
}
