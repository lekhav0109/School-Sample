import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Student } from 'src/app/interface/Student';
import { StudentService } from 'src/app/services/data.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit, OnDestroy {

  cols: any[];
  editDialogDisplay: boolean = false;
  addDialogDisplay: boolean = false;
  selectedStudentDetail: Student;
  studentList: Student[];
  time: number = 3000; // refresh time interval
  intervalSubscription: Subscription;
  newStudent: any = {};
  
  // Service added using DI
  constructor(public db: StudentService) { }

  /**
   * OnInit method to get list of students, every 3 sec
   */
  ngOnInit(): void {
    this.intervalSubscription = interval(this.time).subscribe(() => {
      this.timeInterval();
    });

    this.cols = [
      { field: 'studentId', header: 'Student Id' },
      { field: 'name', header: 'Name' },
      { field: 'grade', header: 'Grade' }
    ];
    this.db.getStudentList().then(d => { this.studentList = d })
  }

  /**
   * Control the Add Student Dialog Display
   */
  addStudentDialog() {
    this.addDialogDisplay = true
  }

  /**
   * Method to add new Student
   * @param _student Student to Add
   */
  addNewStudent(_student: Student) {
    this.db.addStudent(_student)
    this.newStudent = {};
    this.addDialogDisplay = false;
  }

  /**
   * Method to call getStudents for every 3 sec
   */
  timeInterval(): void {
    this.db.getStudentList().then(d => { this.studentList = d })
  }

  /**
   * Set the selected Student
   * @param _student selected Student 
   */
  selectedStudentEdit(_student) {
    console.log(_student);
    this.selectedStudentDetail = _student
    this.editDialogDisplay = true;
  }

  /**
   * Method to Delete Student
   * @param _student Student to Delete
   */
  DeleteStudent(_student) {
    console.log(_student);
    this.db.deteleStudent(_student)
    this.db.getStudentList().then(d => { this.studentList = d })
    this.editDialogDisplay = false;
  }

  /**
   * Method for Cancel click on the dialog
   */
  CancelStudentUpdate() {
    this.db.getStudentList().then(d => { this.studentList = d })
    this.editDialogDisplay = false;
  }

  /**
   * Method to Edit Student
   * @param _student Student to Edit
   */
  UpdateStudent(_student) {
    this.db.updateStudent(_student)
    this.db.getStudentList().then(d => { this.studentList = d })
    this.editDialogDisplay = false;
  }

  /**
   * On destroy of the component we need to 
   * unsubscribe to the subscriptions
   */
  ngOnDestroy(): void {

    this.intervalSubscription.unsubscribe();
  }
}
