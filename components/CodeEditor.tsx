'use client';

import { Editor } from '@monaco-editor/react';
import { Card } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export default function CodeEditor({ value, onChange, height = '180px' }: CodeEditorProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Code2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expression Input
                </span>
              </div>
            </div>
          </div>
          <div className="p-1">
            <Editor
              height={height}
              defaultLanguage="plaintext"
              value={value}
              onChange={(val) => onChange(val || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                glyphMargin: false,
                renderLineHighlight: 'none',
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                },
                overviewRulerLanes: 0,
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                renderValidationDecorations: 'off',
                padding: { top: 16, bottom: 16 },
                fontFamily: 'Geist Mono, Monaco, Consolas, monospace',
                fontWeight: '500',
                cursorStyle: 'line',
                cursorBlinking: 'smooth',
                smoothScrolling: true,
              }}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme('custom-dark', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [
                    { token: '', foreground: 'ffffff', background: '1f2937' }
                  ],
                  colors: {
                    'editor.background': '#1f2937',
                    'editor.foreground': '#ffffff',
                    'editorCursor.foreground': '#7c3aed',
                    'editor.selectionBackground': '#7c3aed40',
                    'editor.lineHighlightBackground': '#374151',
                  }
                });
                monaco.editor.setTheme('custom-dark');
              }}
            />
          </div>
        </Card>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Enter mathematical expressions like: 3+4*5, (a+b)*c, sin(x), etc.
      </div>
    </div>
  );
}