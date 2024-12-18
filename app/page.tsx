

import { StudentDashboard } from '@/components/student-dashboard'

import { AppSidebar } from '@/components/sidebar'

export default function DashboardPage() {
  return (

    <div className="flex h-screen bg-gray-100 w-full">

      <AppSidebar/>
      
      {/* <div className="flex-1">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search your course"
                  className="pl-9 w-[300px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Adeline H. Dancy</p>
                  <p className="text-sm text-gray-500">adeline@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Select defaultValue="2024-25">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">AY 2024-25</SelectItem>
                      <SelectItem value="2023-24">AY 2023-24</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="cbse9">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbse9">CBSE 9</SelectItem>
                      <SelectItem value="cbse10">CBSE 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Add new Student</Button>
              </div>
              <StudentTable students={[]} />
            </div>
          </div>
        </main>
      </div> */}
      <StudentDashboard />
    </div>
  )
}

