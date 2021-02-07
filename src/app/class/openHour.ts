import { Time } from '@angular/common';
import { business } from './business';


export class openHour{
    constructor(public BusinessCode?:business,public DayInWeek?:string,public StartHour?:Time,public EndHour?:Time)
    {}
}

