import {  useState } from 'react';
import { useStudents } from '@/store/use-students';
import { NewStudent } from '@/types/student';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewStudentDialog({ open, onOpenChange }: NewStudentDialogProps) {
  const { addStudent } = useStudents();

  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: '',
    cohort: 'AY 2024-25',
    courses: {
      science: { isEnrolled: false, class: '' },
      math: { isEnrolled: false, class: '' },
    },
    dateJoined: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  const handleCourseChange = (
    courseName: keyof NewStudent['courses'],
    isChecked: boolean,
    selectedClass: string
  ) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      courses: {
        ...prevStudent.courses,
        [courseName]: {
          isEnrolled: isChecked,
          class: isChecked ? selectedClass : '',
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert the courses object to an array
      const coursesArray = Object.entries(newStudent.courses)
        .filter(([, course]) => course.isEnrolled)
        .map(([name, details]) => ({ name, class: details.class }));

      const studentToAdd = {
        ...newStudent,
        lastLogin: new Date().toISOString(),
        courses: coursesArray,  // Send the courses as an array
      } as NewStudent & { lastLogin: string; courses: Array<{ name: string; class: string }> };

      await addStudent(studentToAdd);
      setNewStudent({
        name: '',
        cohort: 'AY 2024-25',
        courses: {
          science: { isEnrolled: false, class: '' },
          math: { isEnrolled: false, class: '' },
        },
        dateJoined: new Date().toISOString().split('T')[0],
        status: 'active',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>

            {/* Cohort Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cohort" className="text-right">
                Cohort
              </Label>
              <Input
                id="cohort"
                value={newStudent.cohort}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, cohort: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>

            {/* Courses Fields */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Courses</Label>
              <div className="col-span-3 space-y-4">
                {/* Science Course */}
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={newStudent.courses.science.isEnrolled}
                    onCheckedChange={(checked: boolean) =>
                      handleCourseChange('science', checked, newStudent.courses.science.class)
                    }
                  />
                  <Label className="ml-2">Science</Label>
                  {newStudent.courses.science.isEnrolled && (
                    <Select
                      value={newStudent.courses.science.class}
                      onValueChange={(value) =>
                        handleCourseChange('science', true, value)
                      }
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class 9">class 9</SelectItem>
                        <SelectItem value="class 10">class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Math Course */}
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={newStudent.courses.math.isEnrolled}
                    onCheckedChange={(checked: boolean) =>
                      handleCourseChange('math', checked, newStudent.courses.math.class)
                    }
                  />
                  <Label className="ml-2">Math</Label>
                  {newStudent.courses.math.isEnrolled && (
                    <Select
                      value={newStudent.courses.math.class}
                      onValueChange={(value) =>
                        handleCourseChange('math', true, value)
                      }
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class 9">class 9</SelectItem>
                        <SelectItem value="class 10">class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            {/* Status Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                value={newStudent.status}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, status: e.target.value as "active" | "inactive" })
                }
                
                className="col-span-3"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!newStudent.name}>
              Add Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
