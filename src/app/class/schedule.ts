import { Time } from '@angular/common';
import { business } from './business';
import { event } from './event';

export class schedule{
    constructor( public EventCode?:event,public BusinessCode?:business,public EventDate?:Date,
        public Duration?:number,public Done?:boolean,public Cost?:number, public hour?:Time,
        public description?:string, public subject?:string)
    {}
}
