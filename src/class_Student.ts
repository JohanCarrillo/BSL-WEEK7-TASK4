import { Attendee } from "./class_Attendee";

export class Student extends Attendee {

	constructor(name: string, email: string) {
		super(name, email);
	}

	public showInfo(): void {
		console.log(`Estudiante, nombre: ${this.name}, email: ${this.email}`)
	}
}