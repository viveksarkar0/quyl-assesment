// Importing your singleton Prisma client
import prisma from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request, 
    { params }: { params:any }
  ) {
    try {
      const { id } =  await params;
      console.log("Attempting to delete student with ID:", id); // Log the ID received in the request
  
      // Check if the student exists
      const student = await prisma.student.findUnique({
        where: { id },
        include: { courses: true }, // Include associated courses to check if they exist
      });
      
      if (!student) {
        console.log('Student not found');
        return NextResponse.json({ message: 'Student not found' }, { status: 404 });
      }
  
      // Delete the student (cascading delete of related courses is handled by Prisma due to `onDelete: Cascade`)
      await prisma.student.delete({
        where: { id },
      });
  
      console.log('Student deleted successfully');
      return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      return NextResponse.error();
    }
  }
  
    
  export async function PUT(request: Request, { params }: { params:any }) {
    const { id } = params;
    const updatedData = await request.json();
  
    try {
      const updatedStudent = await prisma.student.update({
        where: { id },
        data: {
          ...updatedData,
          courses: updatedData.courses
            ? {
                upsert: updatedData.courses.map((course: { id: string; name: string; class: string }) => ({
                  where: { id: course.id },
                  create: { name: course.name, class: course.class },
                  update: { name: course.name, class: course.class },
                })),
              }
            : undefined,
        },
        include: {
          courses: true,
        },
      });
  
      return NextResponse.json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      return NextResponse.error();
    }
  }