import { Component, OnInit } from '@angular/core';
import { FireDBService } from '../service/fireDB/fire-db.service';
import { Observable } from 'rxjs';
import { Plans } from 'src/interfaces/colorSettings/Plan';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	items;
	plans;
	company;

	constructor(private db: FireDBService) { }

	changePlan(planId) {
		const resp = this.db.setPlan(planId);
		resp.then( (success) => {
			console.log('Success: ', success);
		}, (err) => {
			console.log('Error: ', err);
		});
	}

	orderBy(arr, attr) {
		arr.sort( (a, b) => (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0 );
		this.plans = arr;
	}

	ngOnInit() {
		const company = this.db.getCompany();
		company.subscribe( (data) => {
			this.company = data;
		});

		const colors = this.db.getColors();
		colors.subscribe( (data: Plans) => {
			this.items = data.plan;
		});

		const plans = this.db.getPlans();
		plans.subscribe( (data: Plans) => {
			this.orderBy(data.plan, 'id');
		});
	}

}
