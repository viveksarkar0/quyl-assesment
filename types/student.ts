// src/types/student.ts

export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: {
    map: any;
    science: {
      isEnrolled: boolean;
      class: string; // Add the 'class' field for science course
    };
    math: {
      isEnrolled: boolean;
      class: string; // Add the 'class' field for math course
    };
  };
  dateJoined: string; // ISO Date format
  lastLogin: string;  // ISO Date format
  status: 'active' | 'inactive';
}

export interface NewStudent {
  name: string;
  cohort: string;
  courses: {
    science: {
      isEnrolled: boolean;
      class: string; // Add the 'class' field for science course
    };
    math: {
      isEnrolled: boolean;
      class: string; // Add the 'class' field for math course
    };
  };
  dateJoined: string;
  status: 'active' | 'inactive';
}
