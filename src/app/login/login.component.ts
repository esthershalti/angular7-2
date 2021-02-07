import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/user.service';
import { BusinessService } from 'src/business.service';
import { user } from 'src/app/class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public UserSer: UserService, public BusniessSer: BusinessService,public router:Router) { }

  getUser:user=new user();
  returnValue:user;
  loginClick()
  {
   
    console.log(this.getUser.UserName+ " "+this.getUser.UserPassword)
    this.UserSer.ExistUser(this.getUser).subscribe(suc=>{
      this.returnValue=suc;
      this.getUser=suc;
      console.log(suc);
      console.log(this.returnValue)
      if(this.returnValue== false)
      {
        alert("לא קיים");
        this.getUser.UserPassword=null;
        this.getUser.UserName="";
      }
      else
      {
        alert("ברוכים הבאים");
        
        sessionStorage.setItem("userNow",this.getUser.UserName);
        sessionStorage.setItem("UserType",new Boolean(this.getUser.UserType).toString());
        this.getUser.UserPassword=null;
        this.getUser.UserName="";
        // this.router.navigate(['/calendar']);


      }
    },err=>{alert("errrrrror");console.log(err);});

  }
  ngOnInit(): void {
  }

}
