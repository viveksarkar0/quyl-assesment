-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
