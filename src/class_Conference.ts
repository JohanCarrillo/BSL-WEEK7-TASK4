import { Mentor } from './class_Mentor';
import { Student } from './class_Student';

export class Conference {

	private _title: string;
	private _mentor: Mentor;
	public startDate: Date;
	public endDate: Date;
	private _studentList: Student[];

	constructor(
		title: string,
		mentor: Mentor,
		startDate: Date,
		endDate: Date,
	) {
		this._title = title;
		this._mentor = mentor;
		this.startDate = startDate;
		this.endDate = endDate;
		this._studentList = [];
	}

	// -------------------------------- getters --------------------------------- 

	public get title() {return this._title;}
	public get mentor() {return this._mentor;}
	// public get students() {return this._students;}

	// ----------------------------- public methods -----------------------------

	public addStudent = (newStudent: Student): void => {
		if (this._studentList.length <= 20) {
			this._studentList.push(newStudent);
			console.log(`Estudiante ${newStudent.name} guardado exitosamente`);
		}
		else console.log('La conferencia ya esta llena');
	}

	public showStudentList () {
		if (this._studentList.length === 0) {
			console.log('No hay estudiantes registrados');
		} else {
			this._studentList.forEach( student => {
				console.log(`Nombre: ${student.name}, email: ${student.email}`);
			});
		}
	}
}