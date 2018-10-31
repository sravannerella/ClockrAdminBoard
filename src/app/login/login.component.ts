import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	loginForm;
	iteration = 0;
	submitForm = false;
	questions = [
		{
			type: 'email',
			label: 'Email Or Phone',
			placeholder: 'Enter Email or Phone',
			controlName: 'email',
			autoComplete: 'email',
			errMsg: 'Couldn\'t find your account'
		},
		{
			type: 'password',
			label: 'Password',
			placeholder: 'Enter Password',
			controlName: 'pass',
			autoComplete: 'current-password',
			errMsg: 'Invalid password'
		}
	];

	constructor(private fb: FormBuilder, private router: Router) {
		this.loginForm = this.fb.group({
			email: ['', [
				Validators.required,
				Validators.pattern(/^(\d{10})|\b[\w|\d]+@[\w|\d]+\.\w{2,}/)
			]],
			pass: ['', [
				Validators.required,
				Validators.minLength(5)
			]]
		});
	}

	ngOnInit() {
	}

	login() {
		console.log(this.loginForm.value);
		this.router.navigateByUrl('/dashboard');
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('pass');
	}

	hasError(controlName) {
		const value = this.loginForm.get(controlName);
		return value.invalid && value.touched;
	}

	isValid(controlName) {
		const value = this.loginForm.get(controlName);
		return value.valid;
	}

	nextQuestion() {
		this.iteration++;
		if (this.iteration === (this.questions.length - 1) ) {
			this.submitForm = true;
		}
	}

}
