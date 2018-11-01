import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class FireDBService {

	items: Observable<{}>;
	plans: Observable<{}>;

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

}
