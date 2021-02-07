import { category } from './category';

export class business{
    constructor(public BusinessCode?:number, public BusinessName?:string, public CategoryCode?:category,public BusinessOwnerCode?:string,
       public BusinessAddress?:string  )
    {}
}
