// react-flip-page.d.ts

declare module 'react-flip-page' {
  import * as React from 'react';

  interface FlipPageProps {
    width?: number | string;
    height?: number | string;
    orientation?: 'vertical' | 'horizontal';
    animationDuration?: number;
    uncutPages?: boolean;
    responsive?: boolean;
    showHint?: boolean;
    disableSwipe?: boolean;
    onPageChange?: (pageIndex: number) => void;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }

  class FlipPage extends React.Component<FlipPageProps> {
    gotoNextPage: () => void;
    gotoPreviousPage: () => void;
    getPageNumber: () => number;
    getPageCount: () => number;
  }

  export default FlipPage;
}
