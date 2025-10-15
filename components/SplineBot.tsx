'use client';

import Spline from '@splinetool/react-spline/next';

export default function SplineBot() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Spline
        scene="https://prod.spline.design/sGKN4s5nO6xISwqK/scene.splinecode"
      />
    </div>
  );
}
