import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public contributors;
  public loading = true;
  private sub: Subscription;
  private readonly token = '705e3e025e693a99d30ca4e3f694fbe7b175a1e9';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.getContributors();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getContributors() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `token ${this.token}`
      })
    };

    this.sub = this.http.get('https://api.github.com/repos/biig-io/ngx-smart-modal/contributors', httpOptions)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe(res => {
        this.contributors = res;
      });
  }

}
