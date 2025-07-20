"use client"

import { useState } from "react"
import { TicketList } from "@/components/support/ticket-list"
import { AddTicketModal } from "@/components/modals/add-ticket-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { supportStats } from "@/mock/stats"
import { Stats } from "@/components/common/stats"

export default function SupportPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Support & Helpdesk</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer support tickets, SLAs, and help desk operations
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white shadow-lg transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <Stats stats={supportStats} />
      <TicketList />

      <AddTicketModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
