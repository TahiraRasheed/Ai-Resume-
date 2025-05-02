'use client';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChartIcon, AlertCircle } from "lucide-react"

export function ParsingAccuracy() {
  // This would be fetched from your API in a real implementation
  const accuracyData = {
    overallAccuracy: 94,
    commonIssues: [
      { issue: "Unrecognized education format", count: 12 },
      { issue: "Missing work dates", count: 8 },
      { issue: "Ambiguous skill descriptions", count: 5 },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 " />
          Resume Parsing Accuracy
        </CardTitle>
        <CardDescription>LLM parsing performance and common issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Accuracy</span>
              <span className="text-2xl font-bold">{accuracyData.overallAccuracy}%</span>
            </div>
            <Progress value={accuracyData.overallAccuracy} className="h-2 [&>div]:!bg-[#BA02E1]" />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
              Common Parsing Issues
            </h4>
            <div className="space-y-3">
              {accuracyData.commonIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{issue.issue}</span>
                  <Badge variant="outline" className="bg-amber-50">
                    {issue.count} instances
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}