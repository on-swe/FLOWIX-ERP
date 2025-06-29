"use client"

import { useState } from "react"
import { ProjectOverview } from "@/components/projects/project-overview"
import { ProjectList } from "@/components/projects/project-list"
import { AddProjectModal } from "@/components/modals/add-project-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProjectsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Project Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage projects, tasks, milestones, and team collaboration</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <ProjectOverview />
      <ProjectList />

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
