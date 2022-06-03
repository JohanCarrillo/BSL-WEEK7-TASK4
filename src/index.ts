
import { Menu } from './class_Menu';
import { Register } from './class_Register';

(async () => {
  const menu = new Menu();
  const register = new Register;
    while (menu.isActive()) {

      menu.printMenu()
      let key = await menu.getInt('seleccione un número de la lista:')
    
      switch (key) {
        case 0:
          console.log('0: ',key);
          menu.close()
          process.exit()
          break;
        
        case 1:
          console.log(`Opcion ${key}: agregar mentor`);
          await register.addMentor();
          break;
        
        case 2:
          console.log(`Opcion ${key}: agregar estudiante`);
          await register.addStudent();
          break;
        
        case 3:
          console.log(`Opcion ${key}: agregar conferencia`);
          await register.addConference();
          break;
      
        case 4:
          console.log(`Opcion ${key}: ver lista de conferencias`);
          register.showEvents();
          break;
      
        case 5:
          console.log(`Opcion ${key}; ver lista de conferencias por mentor`);
            register.showEventsByMentor()
          break;
      
        case 6:
          console.log(`Opcion ${key}: registrar estudiante a conferencia`);
          await register.addStudentToConference();
          break;
        
        case 7:
          console.log(`Opcion ${key}: ver lista de mentores`);
          register.showMentors();
          break;

          case 8:
            console.log(`Opcion ${key}: ver lista de estudiantes`);
            register.showStudents();
            break;

          case 9:
            console.log(`Opcion ${key}: ver lista de estudiantes`);
            register.showStudentsByEvent();
            break;
      
        default:
          console.log('Debe elegir una opción valida');
          //menu.close()
          break;
      }
    }
    
  console.log('Adios');
    
})()


