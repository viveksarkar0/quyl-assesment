// Importing your singleton Prisma client
import prisma from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET /api/students - Fetch all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true, // Include associated courses when fetching students
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.error();
  }
}

// POST /api/students - Add a new student
export async function POST(request: Request) {
  try {
    const { name, cohort, courses, dateJoined, lastLogin, status } = await request.json();

    // Create the new student along with their courses
    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status,
        courses: {
          create: courses.map((course: { name: string, class: string }) => ({
            name: course.name,
            class: course.class,
          })),
        },
      },
      include: {
        courses: true, // Return courses with the student
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.error();
  }
}


// DELETE /api/students/[id] - Delete student





export async function PUT(request: Request) {
  try {
    const { id, updatedData } = await request.json();

    // Update student with optional course updates
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...updatedData,
        courses: updatedData.courses
          ? {
              upsert: updatedData.courses.map((course: { id: string, name: string, class: string }) => ({
                where: { id: course.id },
                create: {
                  name: course.name,
                  class: course.class,
                },
                update: {
                  name: course.name,
                  class: course.class,
                },
              })),
            }
          : undefined, // If no courses are provided, don't update them
      },
      include: {
        courses: true, // Return courses with the updated student
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.error();
  }
}



