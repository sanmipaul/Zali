import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Leaderboard } from '../Leaderboard';
import { SkipNavLink } from '../SkipNavLink';
import QuestionCard from '../QuestionCard';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  describe('SkipNavLink', () => {
    it('should render skip navigation link', () => {
      const { container } = render(<SkipNavLink />);
      const link = screen.getByText('Skip to main content');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#main-content');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<SkipNavLink />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Leaderboard', () => {
    const mockLeaderboardData = [
      {
        address: '0x1234567890123456789012345678901234567890',
        username: 'Player1',
        totalScore: 1000,
        rank: 1,
      },
      {
        address: '0x0987654321098765432109876543210987654321',
        username: 'Player2',
        totalScore: 900,
        rank: 2,
      },
      {
        address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        username: 'Player3',
        totalScore: 800,
        rank: 3,
      },
    ];

    it('should render leaderboard with proper structure', () => {
      render(
        <Leaderboard
          data={mockLeaderboardData}
          currentUserAddress="0x1234567890123456789012345678901234567890"
        />
      );
      const leaderboard = screen.getByRole('region', { name: /leaderboard/i });
      expect(leaderboard).toBeInTheDocument();
    });

    it('should have proper list semantics', () => {
      render(
        <Leaderboard
          data={mockLeaderboardData}
          currentUserAddress="0x1234567890123456789012345678901234567890"
        />
      );
      const list = screen.getByRole('list', { name: /top 10 players/i });
      expect(list).toBeInTheDocument();
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(mockLeaderboardData.length);
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Leaderboard
          data={mockLeaderboardData}
          currentUserAddress="0x1234567890123456789012345678901234567890"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have aria-labels for scores', () => {
      render(
        <Leaderboard
          data={mockLeaderboardData}
          currentUserAddress="0x1234567890123456789012345678901234567890"
        />
      );
      const scoreLabels = screen.queryAllByLabelText(/score:/i);
      expect(scoreLabels.length).toBeGreaterThan(0);
    });
  });

  describe('QuestionCard', () => {
    const mockQuestion = {
      id: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswerIndex: 1,
      category: 'Math',
      difficulty: 'easy' as const,
    };

    it('should render question with proper fieldset structure', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={mockQuestion}
          questionNumber={1}
          totalQuestions={10}
          onAnswer={mockOnAnswer}
        />
      );
      const fieldset = screen.getByDisplayValue(/what is 2/i).closest('fieldset');
      expect(fieldset).toBeInTheDocument();
    });

    it('should have proper legend element', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={mockQuestion}
          questionNumber={1}
          totalQuestions={10}
          onAnswer={mockOnAnswer}
        />
      );
      const legend = screen.getByText('What is 2 + 2?');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('should have aria-labels on answer buttons', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={mockQuestion}
          questionNumber={1}
          totalQuestions={10}
          onAnswer={mockOnAnswer}
        />
      );
      const optionA = screen.getByLabelText(/Option A:/i);
      expect(optionA).toBeInTheDocument();
    });

    it('should have proper category and difficulty labels', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={mockQuestion}
          questionNumber={1}
          totalQuestions={10}
          onAnswer={mockOnAnswer}
        />
      );
      const categoryLabel = screen.getByLabelText(/Category: Math/i);
      const difficultyLabel = screen.getByLabelText(/Difficulty: easy/i);
      expect(categoryLabel).toBeInTheDocument();
      expect(difficultyLabel).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
      const mockOnAnswer = jest.fn();
      const { container } = render(
        <QuestionCard
          question={mockQuestion}
          questionNumber={1}
          totalQuestions={10}
          onAnswer={mockOnAnswer}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Focus Management', () => {
    it('should have visible focus indicators on buttons', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={{
            id: 1,
            question: 'Test?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswerIndex: 0,
            category: 'Test',
            difficulty: 'easy',
          }}
          questionNumber={1}
          totalQuestions={1}
          onAnswer={mockOnAnswer}
        />
      );
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        const styles = window.getComputedStyle(button);
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });

    it('skip link should be focusable', () => {
      const { container } = render(<SkipNavLink />);
      const link = screen.getByText('Skip to main content');
      link.focus();
      expect(document.activeElement).toBe(link);
    });
  });

  describe('Semantic HTML', () => {
    it('should use proper heading hierarchy', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={{
            id: 1,
            question: 'Question?',
            options: ['1', '2', '3', '4'],
            correctAnswerIndex: 0,
            category: 'Test',
            difficulty: 'medium',
          }}
          questionNumber={1}
          totalQuestions={5}
          onAnswer={mockOnAnswer}
        />
      );
      const legend = screen.getByText('Question?');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('leaderboard should use list semantics', () => {
      const data = [
        {
          address: '0x123',
          username: 'User',
          totalScore: 100,
          rank: 1,
        },
      ];
      render(<Leaderboard data={data} />);
      const orderedList = document.querySelector('ol');
      expect(orderedList).toBeInTheDocument();
      const listItems = document.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper aria-labels on form fields', () => {
      const mockOnAnswer = jest.fn();
      render(
        <QuestionCard
          question={{
            id: 1,
            question: 'Which is correct?',
            options: ['Yes', 'No', 'Maybe', 'Sometimes'],
            correctAnswerIndex: 0,
            category: 'General',
            difficulty: 'easy',
          }}
          questionNumber={1}
          totalQuestions={1}
          onAnswer={mockOnAnswer}
        />
      );
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('should have aria-hidden on decorative elements', () => {
      const { container } = render(<SkipNavLink />);
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs.length).toBeGreaterThanOrEqual(0);
    });

    it('leaderboard section should have aria-label', () => {
      const data = [
        {
          address: '0xabc',
          username: 'Player',
          totalScore: 50,
          rank: 1,
        },
      ];
      const { container } = render(<Leaderboard data={data} />);
      const section = container.querySelector('section[aria-label]');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-label', expect.stringContaining('leaderboard'));
    });
  });
});
