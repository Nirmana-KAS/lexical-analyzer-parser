'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, ArrowRight, CheckCircle, Zap } from 'lucide-react';

interface DerivationStepsProps {
  steps: string[];
}

export default function DerivationSteps({ steps }: DerivationStepsProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Card className="modern-card rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
          <GitBranch className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
            Grammar Derivation Steps
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {steps.length} step{steps.length !== 1 ? 's' : ''} in the derivation process
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Live Parsing
          </span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-blue-100 dark:border-blue-800 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 font-mono font-bold min-w-[2.5rem] justify-center h-8"
              >
                {index + 1}
              </Badge>
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-blue-400 dark:text-blue-500" />
              )}
              {index === steps.length - 1 && (
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700">
                {step}
              </div>
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                {index === 0 && "Initial production"}
                {index > 0 && index < steps.length - 1 && "Intermediate step"}
                {index === steps.length - 1 && "Final derivation"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-medium">Derivation completed successfully</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {steps.length}
            </div>
            <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
              Total Steps
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}