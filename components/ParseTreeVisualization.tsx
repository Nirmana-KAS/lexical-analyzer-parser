'use client';

import { useEffect, useRef } from 'react';
import { ParseTreeNode } from '@/types';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface ParseTreeVisualizationProps {
  tree: ParseTreeNode | null;
}

interface HierarchyNodeData extends d3.HierarchyNode<ParseTreeNode> {
  x: number;
  y: number;
}

export default function ParseTreeVisualization({ tree }: ParseTreeVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!tree || !svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(40,40)');

    const root = d3.hierarchy(tree, (d: ParseTreeNode) => d.children);
    const treeLayout = d3.tree<ParseTreeNode>().size([width - 80, height - 80]);
    const treeData = treeLayout(root) as HierarchyNodeData;

    svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        const source = d.source as HierarchyNodeData;
        const target = d.target as HierarchyNodeData;
        return `M${source.x},${source.y} L${target.x},${target.y}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2);

    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        const node = d as HierarchyNodeData;
        return `translate(${node.x},${node.y})`;
      });

    nodes.append('circle')
      .attr('r', 25)
      .attr('fill', (d) => d.data.value ? '#3b82f6' : '#8b5cf6')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2);

    nodes.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text((d) => d.data.value || d.data.rule);

  }, [tree]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Parse Tree Visualization</h3>
      {!tree ? (
        <p className="text-gray-500 text-center py-4">No parse tree to display</p>
      ) : (
        <div className="overflow-auto">
          <svg ref={svgRef}></svg>
        </div>
      )}
    </Card>
  );
}
