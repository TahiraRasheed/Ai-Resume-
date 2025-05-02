// app/analytics/page.jsx

'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Pencil } from 'lucide-react'

export default function AnalyticsPage() {
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Load jobs on mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/jobs/')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        if (data.length) setSelectedJobId(data[0].id)
      })
      .catch(console.error)
  }, [])

  // Load matches for selected job
  useEffect(() => {
    if (!selectedJobId) return
    fetch(`http://127.0.0.1:8000/api/jobs/${selectedJobId}/matches/`)
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(console.error)
  }, [selectedJobId])

  // Save edits for specific match ID
  const handleSave = async (matchId, newStatus, newNotes) => {
    // Optimistic UI
    setCandidates(prev =>
      prev.map(c =>
        c.id === matchId
          ? { ...c, status: newStatus, notes: newNotes }
          : c
      )
    )

    try {
      await fetch(`http://127.0.0.1:8000/api/matches/${matchId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: newNotes }),
      })
    } catch (err) {
      console.error('Save failed', err)
    }
  }

  // Filter candidates by name or skills
  const filtered = candidates.filter(c =>
    c.resume_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.relevant_skills || []).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Analytics</CardTitle>
        <CardDescription>View and manage candidate matches</CardDescription>

        {/* Job Tabs */}
        <div className="flex gap-3 mt-4">
          {jobs.map(job => (
            <button
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`px-4 py-2 text-sm font-medium rounded ${
                selectedJobId === job.id
                  ? 'bg-[#BA02E1] hover:bg-[#8C06B7] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {job.title}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Years Exp</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((c, idx) => (
              <CandidateRow
                key={c.id}
                index={idx}
                candidate={c}
                onSave={handleSave}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Child component for each row with independent status/notes
function CandidateRow({ index, candidate, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState(candidate.status)
  const [notes, setNotes] = useState(candidate.notes)

  const handleSaveClick = () => {
    onSave(candidate.id, status, notes)
    setIsEditing(false)
  }
  const handleCancel = () => {
    setStatus(candidate.status)
    setNotes(candidate.notes)
    setIsEditing(false)
  }

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{candidate.resume_name}</TableCell>
      <TableCell>{candidate.match_score}%</TableCell>
      <TableCell>{candidate.years_experience}</TableCell>
      <TableCell>{candidate.relevant_skills.join(', ')}</TableCell>
      <TableCell>{candidate.email}</TableCell>
      <TableCell>{candidate.contact}</TableCell>
      <TableCell>{candidate.location}</TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-24"
          />
        ) : (
          <Badge variant="outline">{status}</Badge>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-40"
          />
        ) : (
          notes
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSaveClick}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="ml-2"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Pencil />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}