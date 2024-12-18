'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {  HelpCircle, MessageSquare,  Settings } from 'lucide-react'


import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ChevronDown, Bell,} from 'lucide-react'

import { useStudents } from '@/store/use-students'
import { StudentTable } from './student-table'
import { NewStudentDialog } from './new-student-dailog'
import { SidebarTrigger } from './ui/sidebar'


export function StudentDashboard() {
  const { students, fetchStudents, loading, error } = useStudents()
  const [isNewStudentDialogOpen, setIsNewStudentDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.cohort.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-100 w-full relative">
      <header className="flex justify-between items-center mb-6 gap-6 flex-col md:flex-row relative">
        
        <SidebarTrigger className="absolute top-0 left-0 z-10 gap-5 md:hidden" />
        
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 " />
          <Input
              className="pl-10 pr-4 py-6  bg-whit w-96"
              placeholder="Search by name or cohort"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            />
        </div>
        <div className="flex items-center gap-2">
         
        
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <div className="flex items-center gap-3">
          <Image
            src="/profile.png"
            alt="Adeline H. Dancy"
            width={32}
            height={32}
            className=" bg-yellow-300 border"
            
          />
          <span className="text-sm font-medium">Adeline H. Dancy</span>
        </div>
      
      </div>
    
        {/* <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
          <div className="relative w-full md:w-[600px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-6 w-full bg-white"
              placeholder="Search by name or cohort"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            />
          </div>
        </div> */}
        {/* <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="font-semibold">Adeline H. Dancy</p>
            <p className="text-sm text-gray-500">adeline@example.com</p>
          </div>
        </div> */}
      </header>
      <main>
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6 md:gap-0">
            <div className="flex items-center space-x-4">
              <Select defaultValue="2024-25">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-25">AY 2024-25</SelectItem>
                  <SelectItem value="2023-24">AY 2023-24</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="cbse9">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbse9">CBSE 9</SelectItem>
                  <SelectItem value="cbse10">CBSE 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsNewStudentDialogOpen(true)} className="w-full md:w-auto">
              <span>Add new Student</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {/* Pass filtered students to StudentTable */}
          <StudentTable students={filteredStudents} />
        </div>
      </main>
      <NewStudentDialog
        open={isNewStudentDialogOpen}
        onOpenChange={setIsNewStudentDialogOpen}
      />
    </div>
  )
}
