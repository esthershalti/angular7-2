import { user } from './user';

export class event{
    constructor(public UserCode?:user,public EventDate?:Date,public GroomOrBride?:number)
    {}
}
