import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class FireDBService {

	items: Observable<{}>;
	plans: Observable<{}>;
	company: Observable<{}>;
	companyName = 'spherica';

	constructor(private db: AngularFirestore) {
	}

	getColors(): Observable<{}> {
		this.items = this.db.collection('colors').doc('Settings').valueChanges();
		return this.items;
	}

	getPlans(): Observable<{}> {
		this.plans = this.db.collection('pricing').doc('types').valueChanges();
		return this.plans;
	}

	setPlan(planId): Promise<void> {
		return this.db.collection('companies').doc(this.companyName).update({
			planId: planId
		});
	}

	getCompany(): Observable<{}> {
		this.company = this.db.collection('companies').doc(this.companyName).valueChanges();
		return this.company;
	}

}
