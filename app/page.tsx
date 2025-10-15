'use client';

import { useState, useEffect } from 'react';
import { parseExpression } from '@/lib/api';
import { ParseResult } from '@/types';
import { exportParseTreeToPDF, exportSymbolTableToPDF } from '@/lib/pdfExport';

import CodeEditor from '@/components/CodeEditor';
import TokenDisplay from '@/components/TokenDisplay';
import SymbolTable from '@/components/SymbolTable';
import ParseTreeVisualization from '@/components/ParseTreeVisualization';
import TestCases from '@/components/TestCases';
import GrammarDisplay from '@/components/GrammarDisplay';
import DerivationSteps from '@/components/DerivationSteps';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Download, AlertCircle, Sparkles, Code2, TreePine, Table2 } from 'lucide-react';

export default function Home() {
  const [expression, setExpression] = useState('3+4*5');
  const [result, setResult] = useState<ParseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleParse = async () => {
    if (!expression.trim()) {
      setError('Please enter an expression');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await parseExpression(expression);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse expression');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSelect = (testExpression: string) => {
    setExpression(testExpression);
  };

  const handleDownloadParseTree = () => {
    exportParseTreeToPDF('parse-tree-container', expression, 'parse-tree.pdf');
  };

  const handleDownloadSymbolTable = () => {
    exportSymbolTableToPDF('symbol-table-container', expression, 'symbol-table.pdf');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
    <div className="max-w-5xl mx-auto bg-card/80 dark:bg-card/50 backdrop-blur-lg rounded-2xl p-8 space-y-12 shadow-xl">
        {/* Header Section */}
        <header className="text-center space-y-4 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Lexical Analyzer & Parser
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Interactive Expression Parser with Real-time Visualization
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span>Lexical Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              <span>Parse Trees</span>
            </div>
            <div className="flex items-center gap-2">
              <Table2 className="h-4 w-4" />
              <span>Symbol Tables</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Input & Grammar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Input Section */}
            <div className="modern-card rounded-2xl p-6 fade-in-up stagger-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Input Expression</h2>
              </div>
              
              <CodeEditor value={expression} onChange={setExpression} />
              
              <Button
                onClick={handleParse}
                disabled={loading}
                className="w-full mt-6 h-12 gradient-button text-white font-medium rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Parsing Expression...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Parse Expression
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {result && (
                <Alert
                  className={`mt-4 border-0 rounded-xl ${
                    result.success
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}
                >
                  <AlertDescription className="font-medium">
                    {result.message}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mt-4 bg-red-50 border-0 rounded-xl dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-800 dark:text-red-300 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {result && result.errors && result.errors.length > 0 && (
                <div className="mt-4 space-y-2">
                  {result.errors.map((err, index) => (
                    <Alert key={index} className="bg-red-50 border-0 rounded-xl dark:bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertDescription className="text-red-800 dark:text-red-300">
                        <span className="font-semibold">{err.type}:</span> {err.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </div>

            {/* Grammar Display */}
            <div className="fade-in-up stagger-2">
              <GrammarDisplay />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-8 space-y-6">
            {/* Derivation Steps */}
            {result && result.derivation && result.derivation.length > 0 && (
              <div className="fade-in-up stagger-3">
                <DerivationSteps steps={result.derivation} />
              </div>
            )}

            {/* Main Results Tabs */}
            <div className="modern-card rounded-2xl p-6 fade-in-up stagger-4">
              <Tabs defaultValue="tokens" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <TabsTrigger 
                    value="tokens" 
                    className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    Tokens
                  </TabsTrigger>
                  <TabsTrigger 
                    value="symbol"
                    className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                  >
                    <Table2 className="h-4 w-4 mr-2" />
                    Symbol Table
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tree"
                    className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                  >
                    <TreePine className="h-4 w-4 mr-2" />
                    Parse Tree
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tokens" className="mt-6">
                  {result ? (
                    <TokenDisplay tokens={result.tokens} />
                  ) : (
                    <div className="text-center py-12">
                      <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No tokens to display</p>
                      <p className="text-gray-400 text-sm mt-2">Enter an expression and click parse to see tokens</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="symbol" className="mt-6">
                  {result ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Symbol Table</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadSymbolTable}
                          className="rounded-lg border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div id="symbol-table-container">
                        <SymbolTable entries={result.symbol_table} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Table2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No symbol table to display</p>
                      <p className="text-gray-400 text-sm mt-2">Parse an expression to generate symbol table</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tree" className="mt-6">
                  {result && result.parse_tree ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Parse Tree</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadParseTree}
                          className="rounded-lg border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div id="parse-tree-container">
                        <ParseTreeVisualization tree={result.parse_tree} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TreePine className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No parse tree to display</p>
                      <p className="text-gray-400 text-sm mt-2">Parse a valid expression to generate parse tree</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Test Cases */}
            <div className="fade-in-up stagger-4">
              <TestCases onSelect={handleTestSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}