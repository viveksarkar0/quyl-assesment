import { create } from 'zustand';
import { Student, NewStudent } from '@/types/student';

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  addStudent: (student: NewStudent) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  updateStudent: (id: string, updatedData: Partial<NewStudent>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStudents = create<StudentState>((set) => ({
  students: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const students = await response.json();
      set({ students, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addStudent: async (student: NewStudent) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      const newStudent = await response.json();
      set((state) => ({
        students: [...state.students, newStudent],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteStudent: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', response.status, errorText);
        throw new Error('Failed to delete student');
      }
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },
  

  updateStudent: async (id: string, updatedData: Partial<NewStudent>) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      const updatedStudent = await response.json();
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? { ...student, ...updatedStudent } : student
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: string | null) => set({ error }),
}));
