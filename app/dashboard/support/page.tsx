"use client"

import { useState } from "react"
import { SupportOverview } from "@/components/support/support-overview"
import { TicketList } from "@/components/support/ticket-list"
import { AddTicketModal } from "@/components/modals/add-ticket-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SupportPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Support & Helpdesk</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer support tickets, SLAs, and help desk operations
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <SupportOverview />
      <TicketList />

      <AddTicketModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
