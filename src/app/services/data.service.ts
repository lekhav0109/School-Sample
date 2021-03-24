import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interface/Student';

@Injectable({
  providedIn: 'root'
})
// Service for accessing the students via API
export class StudentService {

  constructor(public http:HttpClient) { }

  /**
   * Method to get the list of students
   * @returns List of students
   */
  getStudentList(): Promise<Student[]> {
    const URL = 'http://localhost:8080/api/v1/student';
    return this.http
      .get<any>(URL)
      .toPromise()
      .then((res) => res as any)
      .then((data) => data)
      .catch((err) => console.log('err', err));
  }

  /**
   * Method to delete the student
   * @param _student Student to be deleted
   * @returns 
   */
  deteleStudent(_student: Student): Promise<Student> {
    const URL = 'http://localhost:8080/api/v1/student/' + _student.studentId;
    return this.http
      .delete<any>(URL)
      .toPromise()
      .then((res) => res as any)
      .then((data) => data)
      .catch((err) => console.log('err', err));
  }

  /**
   * Method to update the student
   * @param _student Student to be updated
   * @returns 
   */
  updateStudent(_student: Student): Promise<Student> {
    const URL = 'http://localhost:8080/api/v1/student' ;
    const dataObj = _student
    return this.http
      .put<any>(URL,dataObj)
      .toPromise()
      .then((res) => res as any)
      .then((data) => data)
      .catch((err) => console.log('err', err));
  }

  /**
   * Method to Add a new Student
   * @param _student Student to be Added
   * @returns 
   */
  addStudent(_student: Student): Promise<Student> {
    const URL = 'http://localhost:8080/api/v1/student' ;
    const dataObj = _student
    return this.http
      .post<any>(URL,dataObj)
      .toPromise()
      .then((res) => res as any)
      .then((data) => data)
      .catch((err) => console.log('err', err));
  }
}
