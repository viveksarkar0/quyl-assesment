'use client';

import { Key, useState } from 'react';
import { Book, Calculator } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Student } from '@/types/student';
import { useStudents } from '@/store/use-students';

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<Partial<Student>>({});

  const { deleteStudent, updateStudent } = useStudents();

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      await deleteStudent(selectedStudent.id);
      setIsDialogOpen(false);
    }
  };

  const handleUpdate = async () => {
    if (selectedStudent) {
      await updateStudent(selectedStudent.id, updatedData);
      setIsUpdateDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-bold text-black">Student Name</TableHead>
            <TableHead className="font-bold text-black">Cohort</TableHead>
            <TableHead className="font-bold text-black">Courses</TableHead>
            <TableHead className="font-bold text-black">Date Joined</TableHead>
            <TableHead className="font-bold text-black">Last Login</TableHead>
            <TableHead className="font-bold text-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(student)}
            >
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.cohort}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {student.courses.map((course: { id: Key | null | undefined; name: string; class: string; }) => (
                    <div
                      key={course.id}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${course.name.toLowerCase() === 'math'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-red-50 text-red-700'
                        }`}
                    >
                      {course.name.toLowerCase() === 'math' ? (
                        <Calculator className="h-4 w-4" />
                      ) : (
                        <Book className="h-4 w-4" />
                      )}
                      <span>
                        CBSE {course.class.split(' ')[1]}{' '}
                        {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatDate(student.dateJoined)}</TableCell>
              <TableCell>{formatDate(student.lastLogin)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Student</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div>
              <p>
                What would you like to do with <b>{selectedStudent.name}</b>?
              </p>
              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    setUpdatedData(selectedStudent);
                    setIsDialogOpen(false);
                    setIsUpdateDialogOpen(true);
                  }}
                >
                  Update
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Student</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <Input

                value={updatedData.name || ''}
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                placeholder="Enter student name"
              />
              <Input

                value={updatedData.cohort || ''}
                onChange={(e) => setUpdatedData({ ...updatedData, cohort: e.target.value })}
                placeholder="Enter cohort"
              />
              <Input
                value={updatedData.status || ''}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, status: e.target.value as "active" | "inactive" | undefined })
                }
                placeholder="Enter status"
              />

              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
