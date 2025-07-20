"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Download, FileUp, X } from "lucide-react";

export function BulkImportModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Handle file import
      console.log("Importing file:", file.name);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileUp className="h-5 w-5 mr-2" />
            Bulk Import Products
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Download Template</Label>
            <div className="flex items-center space-x-2">
              <Button variant="outline" type="button">
                <Download className="h-4 w-4 mr-2" />
                CSV Template
              </Button>
              <Button variant="outline" type="button">
                <Download className="h-4 w-4 mr-2" />
                Excel Template
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload File</Label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : "Drag & drop your file here or click to browse"}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".csv,.xlsx,.xls" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="text-sm">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!file}
            >
              Import Products
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}