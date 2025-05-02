// components/PipelineSummary.jsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

export function PipelineSummary() {
  // This would be fetched from your API in a real implementation
  const pipelineData = {
    totalAnalyzed: 145,
    shortlisted: 48,
    interviewRecommended: 21,
    parsingFailures: 3,
  };

  const shortlistedPercentage = Math.round((pipelineData.shortlisted / pipelineData.totalAnalyzed) * 100);
  const interviewPercentage = Math.round((pipelineData.interviewRecommended / pipelineData.totalAnalyzed) * 100);
  const failurePercentage = Math.round((pipelineData.parsingFailures / pipelineData.totalAnalyzed) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-#BA02E1]" />
          Candidate Pipeline Summary
        </CardTitle>
        <CardDescription>Overview of candidates in the hiring pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Analyzed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Analyzed</span>
              <span className="text-2xl font-bold">{pipelineData.totalAnalyzed}</span>
            </div>
            <Progress value={100} className="h-2 [&>div]:!bg-[#BA02E1]" />

          </div>

          {/* Shortlisted */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Shortlisted by AI</span>
              <span className="text-2xl font-bold">{pipelineData.shortlisted}</span>
            </div>
            <Progress value={shortlistedPercentage} className="h-2 [&>div]:!bg-[#BA02E1]" />
            <p className="text-xs text-muted-foreground">{shortlistedPercentage}% of total</p>
          </div>

          {/* Interview Recommended */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Interview Recommended</span>
              <span className="text-2xl font-bold">{pipelineData.interviewRecommended}</span>
            </div>
            <Progress value={interviewPercentage} className="h-2 [&>div]:!bg-[#BA02E1]" />
            <p className="text-xs text-muted-foreground">{interviewPercentage}% of total</p>
          </div>

          {/* Parsing Failures */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Parsing Failures</span>
              <span className="text-2xl font-bold">{pipelineData.parsingFailures}</span>
            </div>
            <Progress value={failurePercentage} className="h-2 bg-red-100 [&>div]:!bg-[#BA02E1]" />
            <p className="text-xs text-muted-foreground">{failurePercentage}% of total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
