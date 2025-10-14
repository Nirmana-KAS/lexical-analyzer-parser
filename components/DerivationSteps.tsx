'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DerivationStepsProps {
  steps: string[];
}

export default function DerivationSteps({ steps }: DerivationStepsProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
      <h3 className="text-lg font-semibold mb-3 text-blue-900">
        Grammar Derivation Steps
      </h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {index + 1}
            </Badge>
            <span className="font-mono text-sm text-blue-900">{step}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
