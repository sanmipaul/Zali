import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    const { container, getByText } = render(<ProgressBar current={3} total={10} />);
    
    // Check if progress text is rendered
    expect(getByText('Progress')).toBeInTheDocument();
    expect(getByText('3 / 10')).toBeInTheDocument();
    
    // Check if progress bar is rendered
    const progressBar = container.querySelector('.h-4');
    expect(progressBar).toBeInTheDocument();
  });

  it('hides numbers when showNumbers is false', () => {
    const { container, queryByText } = render(
      <ProgressBar current={3} total={10} showNumbers={false} />
    );
    
    // Check that progress text is not rendered
    expect(queryByText('Progress')).not.toBeInTheDocument();
    expect(queryByText('3 / 10')).not.toBeInTheDocument();
    
    // Progress bar should still be rendered
    expect(container.querySelector('.h-4')).toBeInTheDocument();
  });

  it('handles zero total gracefully', () => {
    const { getByText } = render(<ProgressBar current={0} total={0} />);
    
    // Should not throw and should render 0 / 0
    expect(getByText('0 / 0')).toBeInTheDocument();
  });

  it('handles current greater than total', () => {
    const { getByText } = render(<ProgressBar current={15} total={10} />);
    
    // Should still show the actual numbers
    expect(getByText('15 / 10')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    const { container } = render(<ProgressBar current={5} total={10} />);
    
    const progressBar = container.querySelector('.h-4');
    expect(progressBar).toHaveClass('bg-gradient-to-r');
    expect(progressBar).toHaveClass('from-green-500');
    expect(progressBar).toHaveClass('to-green-600');
  });
});
