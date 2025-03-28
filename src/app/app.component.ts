import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "./services/account.service";
import {User} from "../../models/User";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'inventory-manager';

  user: User;
  loggedIn: boolean = false;
  _opened: boolean;
  current: string;
  register: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
              private ref: ChangeDetectorRef, private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.login(x);
    });
    this.accountService.getLogoutEvent().subscribe(() => this.logoutEvent());
  }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log("NavBar current route: " + this.current);
    this._opened = true;
  }

  navigate(page){
    console.log("navigate " + page)
    this.current = page;
    this.router.navigate([page]);
  }

  login(user){
    if (user == null) return;
    console.log("Logged in user:" + JSON.stringify(this.user))
    this.loggedIn = this.user != null;
    if (this.loggedIn) this.navigate("/productlist");
  }

  logoutEvent() {
    console.log("App logout event");
    this.loggedIn = false;
    this.current = "/";
    this.ref.detectChanges();
  }

  showRegister(){
    console.log("Show register!");
    this.current = "/register";
    this.ref.detectChanges();
  }

  completeRegister(){
    console.log("Complete register!");
    this.current = "/";
    this.ref.detectChanges();
  }

  //onOutletLoaded(component) {
  //  console.log("setting " + component + "user: " + this.user.username +  " userIsAdmin = " + this.user.userIsAdmin);
  //  component.userIsAdmin = this.user.isAdmin;
  //}

}
