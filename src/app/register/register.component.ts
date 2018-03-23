import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  state = '';
  error: any;

  constructor(private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    console.log('aaaaaaaaaaa');
    this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then((success) => {
        console.log('successsss');
        this.router.navigate(['auth']);
      }).catch(err => {
        console.error(err);
        this.error = err;
      });
  }

}
