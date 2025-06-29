"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Key, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: false,
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Security settings saved",
      description: "Your security configuration has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Security
          </CardTitle>
          <CardDescription>Configure authentication and access control settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={settings.twoFactorEnabled ? "default" : "secondary"}>
                {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Switch
                id="two-factor"
                checked={settings.twoFactorEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-attempts">Max Login Attempts</Label>
            <Input
              id="login-attempts"
              type="number"
              value={settings.loginAttempts}
              onChange={(e) => setSettings({ ...settings, loginAttempts: Number.parseInt(e.target.value) })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Policy
          </CardTitle>
          <CardDescription>Configure password requirements and policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-expiry">Password Expiry (days)</Label>
            <Input
              id="password-expiry"
              type="number"
              value={settings.passwordExpiry}
              onChange={(e) => setSettings({ ...settings, passwordExpiry: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Password Requirements</p>
                <ul className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                  <li>• Minimum 8 characters</li>
                  <li>• At least one uppercase letter</li>
                  <li>• At least one number</li>
                  <li>• At least one special character</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
          <CardDescription>Configure IP restrictions and access policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-whitelist">IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
            </div>
            <Switch
              id="ip-whitelist"
              checked={settings.ipWhitelist}
              onCheckedChange={(checked) => setSettings({ ...settings, ipWhitelist: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Security Settings</Button>
      </div>
    </div>
  )
}
