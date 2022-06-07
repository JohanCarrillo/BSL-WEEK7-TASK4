import { Attendee } from './class_Attendee';
import { Conference } from './class_Conference';

export class Mentor extends Attendee {
	private _password: string;
	public listOfEvents: Conference[];

	constructor(name: string, email: string, password: string) {
		super(name, email);
		this._password = password;
		this.listOfEvents = [];
	}

	// -------------------------------- getters --------------------------------- 

	public get password() {return this._password;}

	// ----------------------------- public methods -----------------------------

	public addConference = (conference: Conference): void => {
		this.listOfEvents.push(conference)
	}

	public showEvents(): void {
		if (this.listOfEvents.length === 0) {
			console.log('Este mentor no esta en ningun evento');
		} else {
			this.listOfEvents.forEach(event => {
				console.log(`${event.title}:
				from ${event.startDate.getDate()}/${event.startDate.getMonth() + 1} to ${event.endDate.getDate()}/${event.endDate.getMonth() + 1},`);
			});
		}
	}

	public showInfo(): void {
		console.log(`Mentor, nombre: ${this.name}, email: ${this.email}`);
	}
}