import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiomSchedulerEvent } from 'axiom-scheduler';
import * as moment from 'moment';
import { business } from 'src/app/class/business';
import { schedule } from 'src/app/class/schedule';
import { BusinessService } from 'src/business.service';
import { CategoryService } from 'src/category.service';

import { category } from '../class/category';

@Component({
  selector: 'app-event-window',
  templateUrl: './event-window.component.html',
  styleUrls: ['./event-window.component.scss']
})
export class EventWindowComponent implements OnInit {

  public model: AxiomSchedulerEvent;
  public fromTime: string;
  public toTime: string;


  //
  form
  newEvent= new schedule();
  arrBusiness: business[] = [];
  selectedBusiness: business = new business();
  arrCategory: category[] = [];
  viewBusiness: boolean = false;
  selectedCategory: category = new category();
  FullCategory: category = new category();

  constructor(public modal: NgbActiveModal, public BusinessSer:BusinessService, public CategorySer:CategoryService) {

  }

  ngOnInit() {
    this.CategorySer.getAllCategory().subscribe(suc => { this.arrCategory = suc; }, err => { alert("errrrrror category"); console.log(err); });

    if(!this.model){
      this.model = new AxiomSchedulerEvent('New Event',new Date(Date.now()),new Date(Date.now()),{});
    }
    if (this.model.from) {
      var from = moment(this.model.from);
      this.fromTime = from.format('HH:mm:ss');
    }
    if (this.model.to) {
      var to = moment(this.model.to);
      this.toTime = to.format('HH:mm:ss');
    }
    //
    this.form = new FormGroup({
      subject: new FormControl("", Validators.required),
      taskTime: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      business: new FormControl("", Validators.required),
      note: new FormControl(""),
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
      color: new FormControl("")

    })
  }

  onSelectedCategory(event) {
    for (let element of this.arrCategory) {
      if (element.CategoryName == this.selectedCategory.CategoryName) {
        this.FullCategory = element;
        break;
      }
    }
    this.BusinessSer.getBusinessByCategoryCode(this.FullCategory.CategoryCode).subscribe(suc => { this.arrBusiness = suc; this.viewBusiness = true }, err => { alert("error to load a business list"); console.log(err); });
  }
  onSelectedBusiness() {
    for (let element of this.arrBusiness) {
      if (element.CategoryCode == this.selectedBusiness.BusinessName) {
        this.newEvent.BusinessCode = element;
        break;
      }
    }
    console.log(this.newEvent)

  }

  save() {
    if (this.fromTime) {
      var fromSplitted = this.fromTime.split(':');
      var addTime = new Date(this.model.from);
      addTime.setHours(+fromSplitted[0]);
      addTime.setMinutes(+fromSplitted[1]);
      addTime.setSeconds(+fromSplitted[2]);
      this.model.from = addTime;
    }
    if (this.toTime) {
      var fromSplitted = this.toTime.split(':');
      var addTime = new Date(this.model.to);
      addTime.setHours(+fromSplitted[0]);
      addTime.setMinutes(+fromSplitted[1]);
      addTime.setSeconds(+fromSplitted[2]);
      this.model.to = addTime;
    }
    this.model.data.title = this.model.title;
    // this.selectedCategory.CategoryName=this.model.selectedCategory.CategoryName;
    // this.selectedBusiness.BusinessName=this.model.selectedBusiness.BusinessName;
    this.modal.close(this.model);
  }

}
