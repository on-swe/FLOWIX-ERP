"use client";

import { useState } from "react";
import { ProjectList } from "@/components/projects/project-list";
import { AddProjectModal } from "@/components/modals/add-project-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Stats } from "@/components/common/stats";
import { projectsStats } from "@/mock/stats";

export default function ProjectsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Project Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage projects, tasks, milestones, and team collaboration
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      <Stats stats={projectsStats} />
      <ProjectList />
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
