
export abstract class Attendee {
	private _name: string;
	private _email: string;

	constructor(name: string, email: string) {
		this._name = name;
		this._email = email;
	}

	// -------------------------------- getters --------------------------------- 

	public get name() {return this._name;}
	public get email() {return this._email;}

	// ----------------------------- public methods ----------------------------- 
	
	abstract showInfo(): void;
}
