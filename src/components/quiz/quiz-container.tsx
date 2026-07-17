'use client';

import {
  ArrowRight,
  Award,
  CheckCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { RewardCelebrationModal } from '@/components/reward/RewardCelebrationModal';
import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    question: 'What is the Stellar network primarily used for?',
    options: [
      'Digital art NFTs',
      'Cross-border payments and asset tokenization',
      'Social media platform',
      'Cloud computing services',
    ],
    correctIndex: 1,
  },
  {
    question: 'What is the native cryptocurrency of the Stellar network?',
    options: ['BTC', 'ETH', 'XLM', 'SOL'],
    correctIndex: 2,
  },
  {
    question: 'What consensus mechanism does Stellar use?',
    options: [
      'Proof of Work',
      'Proof of Stake',
      'Stellar Consensus Protocol (SCP)',
      'Delegated Proof of Stake',
    ],
    correctIndex: 2,
  },
  {
    question: "What is a key advantage of Stellar's blockchain?",
    options: [
      'Unlimited smart contract complexity',
      'High transaction fees',
      'Low-cost, fast transactions with built-in exchange',
      'Anonymous transactions only',
    ],
    correctIndex: 2,
  },
  {
    question: 'What is a Soroban smart contract?',
    options: [
      'A Stellar wallet type',
      'A Rust-based smart contract platform on Stellar',
      'A type of Stellar token',
      'A Stellar consensus node',
    ],
    correctIndex: 1,
  },
];

function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function QuizResults({
  score,
  total,
  answers,
  questions,
  onRestart,
}: {
  score: number;
  total: number;
  answers: number[];
  questions: QuizQuestion[];
  onRestart: () => void;
}) {
  const [isRewardOpen, setIsRewardOpen] = useState(true);
  const percentage = Math.round((score / total) * 100);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : undefined}
      className="mx-auto max-w-2xl px-4 py-12"
    >
      {isRewardOpen && (
        <RewardCelebrationModal
          amount="+$0.25 USDC"
          badgeLabel="Stellar Scholar"
          onClose={() => setIsRewardOpen(false)}
        />
      )}
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Award className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold font-heading text-foreground">
          Quiz Complete!
        </h1>
        <p className="text-muted-foreground">Here is how you performed</p>
      </div>

      <div className="mb-8 rounded-xl border bg-card p-6 text-center shadow-sm">
        <p className="text-5xl font-bold text-foreground font-heading">
          {score}/{total}
        </p>
        <p className="mt-2 text-lg font-medium text-muted-foreground">
          {percentage}% Correct
        </p>
        <div className="mx-auto mt-4 h-3 w-full max-w-xs overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {percentage === 100
            ? 'Perfect score!'
            : percentage >= 80
              ? 'Great job!'
              : percentage >= 60
                ? 'Good effort!'
                : 'Keep practicing!'}
        </p>
      </div>

      <div className="mb-8 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Question Breakdown
        </h2>
        {questions.map((q, i) => {
          const wasCorrect = answers[i] === q.correctIndex;
          return (
            <div
              key={i}
              className={`rounded-lg border p-4 ${
                wasCorrect
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {wasCorrect ? (
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {q.question}
                  </p>
                  {!wasCorrect && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your answer:{' '}
                      <span className="text-red-600">
                        {q.options[answers[i]]}
                      </span>
                      {' — '}Correct:{' '}
                      <span className="text-green-700">
                        {q.options[q.correctIndex]}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-[#1A1A1A] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B841]"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Retake Quiz
      </button>
    </motion.div>
  );
}

export function QuizContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const question = MOCK_QUESTIONS[currentIndex];
  const totalQuestions = MOCK_QUESTIONS.length;
  const isCorrect = selectedIndex === question.correctIndex;

  function handleSelect(index: number) {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    setAnswers((prev) => [...prev, index]);
  }

  function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setShowFeedback(false);
    setAnswers([]);
    setIsComplete(false);
  }

  if (isComplete) {
    const score = answers.filter(
      (a, i) => a === MOCK_QUESTIONS[i].correctIndex,
    ).length;
    return (
      <QuizResults
        score={score}
        total={totalQuestions}
        answers={answers}
        questions={MOCK_QUESTIONS}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <QuizProgress current={currentIndex + 1} total={totalQuestions} />

      <div className="mb-6 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-foreground font-heading">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = idx === question.correctIndex;

            let containerClass =
              'border-border bg-card hover:border-primary/50 hover:bg-accent cursor-pointer';
            let letterClass = 'border-border text-muted-foreground';

            if (showFeedback) {
              if (isCorrectOption) {
                containerClass = 'border-green-500 bg-green-50 cursor-default';
                letterClass = 'border-green-500 bg-green-500 text-white';
              } else if (isSelected) {
                containerClass = 'border-red-500 bg-red-50 cursor-default';
                letterClass = 'border-red-500 bg-red-500 text-white';
              } else {
                containerClass =
                  'border-border bg-card opacity-50 cursor-default';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
                className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B841] ${containerClass}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${letterClass}`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-foreground">{option}</span>
                {showFeedback && isCorrectOption && (
                  <CheckCircle
                    className="h-5 w-5 shrink-0 text-green-700"
                    aria-hidden="true"
                  />
                )}
                {showFeedback && isSelected && !isCorrectOption && (
                  <XCircle
                    className="h-5 w-5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
        >
          <div
            className={`mb-4 rounded-lg border p-4 ${
              isCorrect
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-red-500 bg-red-50 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5" aria-hidden="true" />
              ) : (
                <XCircle className="h-5 w-5" aria-hidden="true" />
              )}
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
            {!isCorrect && (
              <p className="mt-1 text-sm">
                The correct answer is:{' '}
                <strong>{question.options[question.correctIndex]}</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-[#1A1A1A] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B841]"
          >
            {currentIndex < totalQuestions - 1 ? (
              <>
                Next Question{' '}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              'View Results'
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
