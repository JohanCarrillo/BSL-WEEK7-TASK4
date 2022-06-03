import { Attendee } from "./class_Attendee";

export class Student extends Attendee {

	constructor(name: string, email: string) {
		super(name, email);
	}
}