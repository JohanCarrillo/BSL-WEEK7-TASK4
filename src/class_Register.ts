import { Student } from "./class_Student";
import { Mentor } from "./class_Mentor";
import { Conference } from "./class_Conference";
import { Menu } from "./class_Menu";

export class Register extends Menu {
	private _listOfEvents: Conference[];
	private _listOfMentors: Mentor[];
	private _listOfStudents: Student[];

	constructor() {
		super();
		this._listOfEvents = [];
		this._listOfMentors = [];
		this._listOfStudents = [];
	}

	// ---------------------------- private methods -----------------------------

	private validateEmail(email: string): boolean {
		// true if email is in use
		const bool1 = this._listOfMentors.some(mentor => email === mentor.email);
		const bool2 = this._listOfStudents.some(student => email === student.email);
		return bool1 || bool2;
	}

	private showEvent(event: Conference): void {
		console.log(
			`${event.title}:
				from ${event.startDate.getDate()}/${event.startDate.getMonth() + 1} to ${event.endDate.getDate()}/${event.endDate.getMonth() + 1},
				Mentor: ${event.mentor.name}`);
	}

	private addAttendee<T>(newAttendee: T): void {
		if (newAttendee instanceof Mentor) {
			this._listOfMentors.push(newAttendee);
			console.log(`New mentor ${newAttendee.name} saved`);
		} else if (newAttendee instanceof Student) {
			this._listOfStudents.push(newAttendee);
			console.log(`New student ${newAttendee.name} saved`);
		}
	}

	// ----------------------------- public methods -----------------------------

	public async addConference(): Promise<void | number> {
		
		// validate mentor information
		console.log('Solo los mentores pueden crear conferencias, valide su informacion:');
		const mentorEmail = await super.getString('Ingrese su email de mentor');
		const mentorPassword = await super.getString('Ingrese su contraseña');
		const mentor = this._listOfMentors.find(mentor => mentor.email === mentorEmail);
		
		if (!mentor) {
			console.log('El email no corresponde a ningun mentor registrado');
		} else if (mentor.password !== mentorPassword) {
			console.log('La contraseña es incorrecta');
		} else {
			
			// if the information is valid we must check date condition
			const conferenceTitle = await super.getString('Inserte el titulo del evento');
			const startDate = new Date(await super.getString('Inserte la fecha de inicio YYYY/MM/DD'));
			const endDate = new Date(await super.getString('Inserte la fecha de finalizacion YYYY/MM/DD'));
			if (startDate === null || endDate === null) {
				console.log('formato de fecha invalido');
				return 0;
			}
			const overlapDateEvent = mentor.listOfEvents.find(event => event.endDate >= startDate);
			if (overlapDateEvent) {
				console.log('El mentor tiene otro evento en esa fecha');
			} else {
				const newConference = new Conference(conferenceTitle, mentor, startDate, endDate);
				mentor.addConference(newConference);
				this._listOfEvents.push(newConference);
				console.log(`El evento ${newConference.title} se creo de forma exitosa`);
			}
		}
	}

	public async addMentor(): Promise<void> {

		const mentorName = await super.getString('Inserte nombre del mentor');
		const mentorEmail = await super.getString('Inserte email del mentor');
		const mentorPassword = await super.getString('Inserte password del mentor');

		if (this.validateEmail(mentorEmail)) {
			console.log('Este email ya esta registrado');
		} else {
			const newMentor = new Mentor(mentorName, mentorEmail, mentorPassword);
			this.addAttendee(newMentor);
		}
	}

	public async addStudent(): Promise<void> {

		const studentName = await super.getString('Inserte nombre del estudiante');
		const studentEmail = await super.getString('Inserte email del estudiante');

		if (this.validateEmail(studentEmail)) {
			console.log('Este email ya esta registrado');
		} else {
			const newStudent = new Student(studentName, studentEmail);
			this.addAttendee(newStudent);
		}
	}

	public async addStudentToConference(): Promise<void> {

		const conferenceTitle = await super.getString(
			'Ingrese el titulo de la conferencia en la que quiere registrar');
		const studentEmail = await super.getString('Ingrese el email del estudiante');

		// validate if student and event exist
		const student = this._listOfStudents.find(student => student.email === studentEmail);
		const conference = this._listOfEvents.find(event => event.title === conferenceTitle);

		if (student && conference){
			conference.addStudent(student);
			console.log(`${student.name} ha sido registrado en ${conference.title}`);
		} else {
			console.log('Estudiante o evento no encontrado');
		}
	}

	public showMentors(): void {
		if (this._listOfMentors.length === 0) {
			console.log('No hay mentores guardados');
		}
		this._listOfMentors.forEach(mentor => {mentor.showInfo()});
	}

	public showStudents(): void {
		if (this._listOfStudents.length === 0) {
			console.log('No hay estudiantes guardados');
		}
		this._listOfStudents.forEach(student => {student.showInfo()});
	}

	public showEvents(): void {
		if (this._listOfEvents.length === 0) {
			console.log('No hay eventos guardados');
		}
		this._listOfEvents.forEach(event => {this.showEvent(event)});
	}

	public showStudentsByEvent(): void {
		if (this._listOfEvents.length === 0) console.log('No hay eventos resgistrados');
		this._listOfEvents.forEach(event => {
			console.log(event.title);
			event.showStudentList();
		})
	}

	public showEventsByMentor(): void {
		if (this._listOfMentors.length === 0) console.log('No hay mentores resgistrados');
		this._listOfMentors.forEach(mentor => {
			console.log(mentor.name);
			mentor.showEvents();
		});
	}
}