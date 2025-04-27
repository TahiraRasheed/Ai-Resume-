"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, ArrowUpDown, Download, MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"

export default function CandidateList() {
  // This would be fetched from your API in a real implementation
  const [candidates, setCandidates] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      role: "Machine Learning Engineer",
      matchScore: 95,
      status: "Shortlisted",
      appliedDate: "2023-04-10",
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Data Scientist",
      matchScore: 92,
      status: "Interview",
      appliedDate: "2023-04-08",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      matchScore: 88,
      status: "Shortlisted",
      appliedDate: "2023-04-12",
    },
    {
      id: "4",
      name: "Emily Wilson",
      role: "DevOps Engineer",
      matchScore: 75,
      status: "Reviewed",
      appliedDate: "2023-04-05",
    },
    {
      id: "5",
      name: "David Kim",
      role: "Data Engineer",
      matchScore: 82,
      status: "Interview",
      appliedDate: "2023-04-09",
    },
    {
      id: "6",
      name: "Jennifer Lee",
      role: "AI Researcher",
      matchScore: 91,
      status: "Shortlisted",
      appliedDate: "2023-04-11",
    },
    {
      id: "7",
      name: "Robert Taylor",
      role: "Backend Developer",
      matchScore: 79,
      status: "Reviewed",
      appliedDate: "2023-04-07",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "Shortlisted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shortlisted</Badge>
      case "Interview":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Interview</Badge>
      case "Reviewed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Reviewed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Database</CardTitle>
        <CardDescription>Browse and manage all analyzed candidates</CardDescription>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/upload">
              <Button size="sm">Add Candidate</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Match Score
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      candidate.matchScore >= 90
                        ? "bg-green-50"
                        : candidate.matchScore >= 80
                          ? "bg-blue-50"
                          : "bg-amber-50"
                    }
                  `}
                  >
                    {candidate.matchScore}%
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/candidates/${candidate.id}`} className="flex w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button variant="ghost" className="p-0 h-auto w-full justify-start font-normal text-red-600">
                          Delete Candidate
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
