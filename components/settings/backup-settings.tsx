"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Database, Download, Calendar, Clock } from "lucide-react"

export function BackupSettings() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: "30",
    includeFiles: true,
  })

  const [isBackingUp, setIsBackingUp] = useState(false)
  const { toast } = useToast()

  const handleManualBackup = async () => {
    setIsBackingUp(true)
    try {
      // Simulate backup process
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast({
        title: "Backup completed",
        description: "Your data has been successfully backed up.",
      })
    } finally {
      setIsBackingUp(false)
    }
  }

  const handleSave = () => {
    toast({
      title: "Backup settings saved",
      description: "Your backup configuration has been updated.",
    })
  }

  const recentBackups = [
    { date: "2024-01-15 02:00", size: "2.4 GB", status: "completed" },
    { date: "2024-01-14 02:00", size: "2.3 GB", status: "completed" },
    { date: "2024-01-13 02:00", size: "2.2 GB", status: "completed" },
    { date: "2024-01-12 02:00", size: "2.1 GB", status: "failed" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Configuration
          </CardTitle>
          <CardDescription>Configure automatic backups and data retention policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Automatic Backup</Label>
              <p className="text-sm text-muted-foreground">Enable scheduled automatic backups</p>
            </div>
            <Switch
              id="auto-backup"
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
            />
          </div>

          {settings.autoBackup && (
            <>
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-period">Retention Period (days)</Label>
                <Select
                  value={settings.retentionPeriod}
                  onValueChange={(value) => setSettings({ ...settings, retentionPeriod: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="include-files">Include File Attachments</Label>
              <p className="text-sm text-muted-foreground">Include uploaded files in backups</p>
            </div>
            <Switch
              id="include-files"
              checked={settings.includeFiles}
              onCheckedChange={(checked) => setSettings({ ...settings, includeFiles: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Backup</CardTitle>
          <CardDescription>Create an immediate backup of your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Create Backup Now</p>
              <p className="text-sm text-muted-foreground">This will create a complete backup of your current data</p>
            </div>
            <Button onClick={handleManualBackup} disabled={isBackingUp}>
              <Download className="mr-2 h-4 w-4" />
              {isBackingUp ? "Creating Backup..." : "Create Backup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Backups
          </CardTitle>
          <CardDescription>View your recent backup history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBackups.map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{backup.date}</p>
                    <p className="text-xs text-muted-foreground">Size: {backup.size}</p>
                  </div>
                </div>
                <Badge variant={backup.status === "completed" ? "default" : "destructive"}>{backup.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Backup Settings</Button>
      </div>
    </div>
  )
}
