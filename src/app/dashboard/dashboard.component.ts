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

	constructor(private db: FireDBService) { }

	orderBy(arr, attr) {
		arr.sort( (a, b) => (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0 );
		console.log('Sorted: ', arr);
		this.plans = arr;
	}

	ngOnInit() {
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
