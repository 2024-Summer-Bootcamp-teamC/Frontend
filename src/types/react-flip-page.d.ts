// src/types/react-flip-page.d.ts
declare module 'react-flip-page' {
  import * as React from 'react';

  export interface FlipPageProps {
    orientation?: 'horizontal' | 'vertical';
    width?: number;
    height?: number;
    responsive?: boolean;
    className?: string;
    children?: React.ReactNode;
  }

  const FlipPage: React.FC<FlipPageProps>;
  export default FlipPage;
}
