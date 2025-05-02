'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ArrowRight } from "lucide-react"

export function TopMatches() {
  // This would be fetched from your API in a real implementation
  const topCandidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Machine Learning Engineer",
      matchScore: 95,
      skills: ["TensorFlow", "Python", "NLP"],
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Data Scientist",
      matchScore: 92,
      skills: ["PyTorch", "Statistics", "AWS"],
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      matchScore: 88,
      skills: ["React", "Node.js", "PostgreSQL"],
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 " />
          Top Matches This Week
        </CardTitle>
        <CardDescription>AI-recommended candidates with highest match scores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCandidates.map((candidate) => (
            <div key={candidate.id} className="flex items-start justify-between p-3 rounded-lg border">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={candidate.image || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-sm text-muted-foreground">{candidate.role}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">Match:</span>
                  <Badge variant="outline" className="bg-green-50">
                    {candidate.matchScore}%
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <span className="text-xs">View Profile</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}