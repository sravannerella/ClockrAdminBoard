import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

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
		{type: 'email', label: 'Email Or Phone', placeholder: 'Enter Email or Phone', controlName: 'email', errMsg: "Couldn't find your account"},
		{type: 'password', label: 'Password', placeholder: 'Enter Password', controlName: 'pass', errMsg: "Invalid password"}
	]

	constructor(private fb: FormBuilder) {
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
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password(){
		return this.loginForm.get('pass');
	}

	hasError(controlName){
		let value = this.loginForm.get(controlName);
		return value.invalid && value.touched;
	}

	isValid(controlName){
		let value = this.loginForm.get(controlName);
		return value.valid;
	}

	nextQuestion(){
		this.iteration++;
		if(this.iteration === (this.questions.length - 1) ){
			this.submitForm = true;
		}
	}

}
