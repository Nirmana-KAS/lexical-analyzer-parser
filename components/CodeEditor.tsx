'use client';

import { Editor } from '@monaco-editor/react';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export default function CodeEditor({ value, onChange, height = '200px' }: CodeEditorProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Input Expression</h3>
      <Editor
        height={height}
        defaultLanguage="plaintext"
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />
    </Card>
  );
}
