export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'averageGrade',
}

export type SortOrder = 'asc' | 'desc';

function sortStrings(
  first: string,
  second: string,
  order: string,
): number {
  if (order === 'asc') {
    return first.localeCompare(second);
  }

  return second.localeCompare(first);
}

function sortNumbers(
  first: number | boolean,
  second: number | boolean,
  order: string,
): number {
  if (order === 'asc') {
    return +first - +second;
  }

  return +second - +first;
}

function getAverage(grades: number[]): number {
  return grades
    .reduce((acc: number, current: number) => acc + current) / (grades.length);
}

export
function sortStudents(students: Student[], sortBy: SortType, order: SortOrder)
  : Student[] {
  const sortedStudents: Student[] = students
    .map((person: Student) => ({ ...person }));

  if (sortBy === SortType.Name || sortBy === SortType.Surname) {
    return sortedStudents.sort((first: Student, second: Student) => {
      return sortStrings(first[sortBy], second[sortBy], order);
    });
  }

  if (sortBy === 'age' || sortBy === 'married') {
    return sortedStudents.sort((first: Student, second: Student) => {
      return sortNumbers(first[sortBy], second[sortBy], order);
    });
  }

  if (sortBy === 'averageGrade') {
    return sortedStudents.sort((first: Student, second: Student) => {
      return sortNumbers(getAverage(first.grades),
        getAverage(second.grades), order);
    });
  }

  return students;
}
