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

	// -------------------------------- getters ---------------------------------
	public get students() {return this._listOfStudents;}
	public get mentors() {return this._listOfMentors;}
	public get events() {return this._listOfEvents;}

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

	// ----------------------------- public methods -----------------------------

	public async addConference(): Promise<void> {
		
		// validate mentor information
		console.log('Solo los mentores pueden crear conferencias, valide su informacion:');
		const mentorEmail = await super.getString('Ingrese su email de mentor');
		const mentorPassword = await super.getString('Ingrese su password');
		const mentor = this._listOfMentors.find(ment => ment.email === mentorEmail);
		
		if (!mentor) {
			console.log('El email no corresponde a ningun mentor registrado');
		} else if (mentor.password !== mentorPassword) {
			console.log('La contraseña es incorrecta');
		} else {  
			
			// if information is valid must check date condition
			const conferenceTitle = await super.getString('Inserte el titulo del evento');
			const startDate = new Date(await super.getString('Inserte la fecha de inicio YYYY/MM/DD'));
			const endDate = new Date(await super.getString('Inserte la fecha de finalizacion YYYY/MM/DD'));

			const overlapDateEvent = mentor.listOfEvents.find(event => event.startDate >= startDate);
			if (overlapDateEvent) {
				console.log('El mentor tiene otro evento en esa fecha');
			} else {
				const newConference = new Conference(conferenceTitle, mentor, startDate, endDate);
				mentor.addConference(newConference);
				this._listOfEvents.push(newConference);
				console.log('El evento se creo de forma exitosa');
			}
		}
	}

	public async addMentor(): Promise<void> {

		const mentorName = await super.getString('Inserte nombre del mentor');
		const mentorEmail = await super.getString('Inserte email del mentor');
		const mentorPassword = await super.getString('Inserte password del mentor');

		if (this.validateEmail(mentorEmail)) {
			console.log('This email is already registered');
		} else {
			const newMentor = new Mentor(mentorName, mentorEmail, mentorPassword);
			this._listOfMentors.push(newMentor);
			console.log(`New mentor ${newMentor.name} saved`);
		}
	}

	public async addStudent(): Promise<void> {

		const studentName = await super.getString('Inserte nombre del estudiante');
		const studentEmail = await super.getString('Inserte email del estudiante');

		if (this.validateEmail(studentEmail)) {
			console.log('This email is already registered');
		} else {
			const newStudent = new Student(studentName, studentEmail);
			this._listOfStudents.push(newStudent);
			console.log('New student saved');
		}
	}

	public async addStudentToConference(): Promise<void> {

		const conferenceTitle = await super.getString(
			'Ingrese el titulo de la conferencia a la que se quiere registrar');
		const studentEmail = await super.getString('Ingrese el email del estudiante');

		// validate if student and event exist
		const student = this._listOfStudents.find(stu => stu.email === studentEmail);
		const conference = this._listOfEvents.find(confe => confe.title === conferenceTitle);

		if (student && conference){
			conference.addStudent(student);
			console.log(`${student.name} registrado en ${conference.title}`);
		} else {
			console.log('Estudiante o evento no encontrado');
		}
	}

	public showMentors(): void {
		if (this._listOfMentors.length === 0) {
			console.log('No hay mentores guardados');
		}
		for (let mentor of this._listOfMentors) {
			console.log(mentor.name, mentor.email);
		}
	}

	public showStudents(): void {
		if (this._listOfStudents.length === 0) {
			console.log('No hay estudiantes guardados');
		}
		for (let student of this._listOfStudents) {
			console.log(student.name, student.email);
		}
	}

	public showEvents(): void {
		if (this._listOfEvents.length === 0) {
			console.log('No hay eventos guardados');
		}
		for (let event of this._listOfEvents) {
			this.showEvent(event);
		}
	}

	public showStudentsByEvent(): void {
		this._listOfEvents.forEach(event => {
			console.log(event.title);
			event.showStudentList();
		})
	}

	public showEventsByMentor(): void {
		this._listOfMentors.forEach(mentor => {
			console.log(mentor.name);
			mentor.showEvents();
		});
	}
}