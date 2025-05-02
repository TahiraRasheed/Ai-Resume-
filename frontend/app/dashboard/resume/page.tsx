"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface ParsedData {
  id: number
  file: string
  name: string
  email: string
  contact: string
  skills: string[]
  qualifications: string
  experience: string
  parsed_at: string
  created_at: string
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus("idle")
      setParsedData(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    setUploadStatus("idle")
    setErrorMessage("")


    const url = `http://localhost:8000/api/resume/upload_resume/`

    const formData = new FormData()
    formData.append("resume", file)

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      })

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        const text = await res.text()
        throw new Error(`Unexpected response: ${text.substring(0, 200)}`)
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setParsedData(data)
      setUploadStatus("success")
    } catch (err: any) {
      setErrorMessage(err.message)
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Upload Resume</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>Upload a resume to analyze with our AI system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{file ? file.name : "Drag and drop your resume"}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, DOCX, and TXT files up to 10MB
                </p>
                <div className="flex justify-center">
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center px-4 py-2 bg-[#BA02E1] text-primary-foreground rounded-md hover:bg-[#8C06B7]">
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Select File</span>
                    </div>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx,.txt"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
              </div>
              {uploadStatus === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Resume successfully analyzed. Scroll down to view results.
                  </AlertDescription>
                </Alert>
              )}
              {uploadStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full bg-[#BA02E1] hover:bg-[#8C06B7]">
              {isUploading ? (
                <><Loader2 className="mr-2 h-4 w-4 bg-[#BA02E1] animate-spin" />Analyzing Resume...</>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Our AI-powered resume analysis process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Upload Resume</h3>
                  <p className="text-sm text-muted-foreground">Upload your resume in PDF, DOCX, or TXT format.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our LLM-powered system extracts skills, experience, and qualifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Job Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Semantic search matches your profile with relevant job openings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">View Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized job recommendations and insights about your resume.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {uploadStatus === "success" && parsedData && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Parsed Resume Data</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p><strong>Name:</strong> {parsedData.name}</p>
            <p><strong>Email:</strong> {parsedData.email}</p>
            <p><strong>Contact:</strong> {parsedData.contact}</p>
            <p><strong>Skills:</strong> {parsedData.skills.join(", ")}</p>
            <p><strong>Qualifications:</strong> {parsedData.qualifications}</p>
            <p><strong>Experience:</strong> {parsedData.experience}</p>
           </div>
        </div>
      )}
    </div>
  )
}