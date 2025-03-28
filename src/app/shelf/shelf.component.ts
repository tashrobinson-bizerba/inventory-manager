import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  searchtext: string;
  shelves: any;
  products: any;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit(): void {
    this.http.get('/shelf').subscribe(data => {
      this.shelves = data;
    });

    this.http.get('/product').subscribe(data => {
      this.products = data;
    });

  }

  deleteShelf(id) {
    console.log(`deleting ${id}`)
    this.http.delete(`/shelf/${id}`)
      .subscribe(res => {
          this.ngOnInit(); //reload the table
        }, (err) => {
          console.log(err);
        }
      );
  }

  cancel(){}
}
