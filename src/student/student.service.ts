import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { In, MongoRepository } from 'typeorm';
import { CreateStudentInput } from './create-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: MongoRepository<Student>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log(studentIds)
    const students = await this.studentRepository.find({
      where: {
        id: In(studentIds),
        // id: {
        //   $in: studentIds,
        // },
      },
    });
    return students;
  }
}

// const timber = await userRepository.find({
//   where: {
//     firstName: { $in: ['Timber', 'Zhang'] },
//   },
// });
