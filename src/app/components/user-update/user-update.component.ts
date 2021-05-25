import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User={};
  constructor(private tokenService:TokenServiceService,
     private userService: UserServiceService) { }

  ngOnInit() {
  }

  // updateUser(user: NgForm) {
  //   this.userService.updateUser(user.value).subscribe(()=>{
  //     console.log(user.value);
  //   })
  // }
}
