'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Users } from "lucide-react"

export function RoleCoverage() {
  // This would be fetched from your API in a real implementation
  const roleData = [
    {
      role: "Machine Learning Engineer",
      openPositions: 3,
      qualifiedCandidates: 12,
      coveragePercentage: 85,
      keySkills: ["TensorFlow", "Python", "NLP", "Computer Vision"],
    },
    {
      role: "Data Scientist",
      openPositions: 2,
      qualifiedCandidates: 8,
      coveragePercentage: 70,
      keySkills: ["Statistics", "R", "Python", "SQL"],
    },
    {
      role: "Full Stack Developer",
      openPositions: 4,
      qualifiedCandidates: 15,
      coveragePercentage: 92,
      keySkills: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      role: "DevOps Engineer",
      openPositions: 1,
      qualifiedCandidates: 3,
      coveragePercentage: 45,
      keySkills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 " />
          Role Coverage Analysis
        </CardTitle>
        <CardDescription>How well current roles are matched with qualified candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roleData.map((role, index) => (
            <div key={index} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-medium">{role.role}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="h-3 w-3 mr-1" />
                    <span>{role.openPositions} open positions</span>
                    <Users className="h-3 w-3 ml-3 mr-1" />
                    <span>{role.qualifiedCandidates} qualified candidates</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Coverage:</span>
                  <Badge
                    variant="outline"
                    className={`${
                      role.coveragePercentage > 80
                        ? "bg-green-50"
                        : role.coveragePercentage > 50
                          ? "bg-amber-50"
                          : "bg-red-50"
                    }`}
                  >
                    {role.coveragePercentage}%
                  </Badge>
                </div>
              </div>
              <Progress
                value={role.coveragePercentage}
                className={`h-2 [&>div]:!bg-[#BA02E1] ${
                  role.coveragePercentage > 80
                    ? "bg-green-100"
                    : role.coveragePercentage > 50
                      ? "bg-amber-100"
                      : "bg-red-100"
                }`}
              />
              <div className="flex flex-wrap gap-1 mt-1">
                {role.keySkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}