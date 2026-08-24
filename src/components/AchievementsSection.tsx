'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';

const achievements = [
  {
    id: 1,
    title: 'Meta Hacker Cup — Round 3 (Semi-finals)',
    organization: 'Meta',
    rank: 'Global Rank 186 / 20,000+',
    date: 'Oct 2025',
    description: 'Advanced to the semi-finals of the global programming competition, demonstrating advanced algorithmic problem-solving skills against top developers worldwide.',
    link: 'https://drive.google.com/file/d/1fyfoUT58o77GQvvdOLx5EOk-yZCI_JSN/view?usp=sharing',
    linkLabel: 'View certificate',
    color: '#a78bfa', // violet
  },
  {
    id: 2,
    title: 'Barclays Hack-O-Hire — Finalist',
    organization: 'Barclays',
    rank: 'Top 100 of 25,000+',
    date: '2025',
    description: 'Secured a finalist position in a highly competitive nationwide hackathon focused on building innovative fintech solutions.',
    link: 'https://www.linkedin.com/posts/siddhant-wani-6059972a5_hackohire-teamgenify-barclayshackathon-ugcPost-7323579469355540483-EGRN',
    linkLabel: 'LinkedIn',
    color: '#2dd4bf', // teal
  },
  {
    id: 3,
    title: 'HackerRank Orchestrate Hackathon',
    organization: 'HackerRank',
    rank: 'Rank 151 / 1,349',
    date: 'May 2026',
    description: 'Built an AI support agent using Hybrid Retrieval, Llama 3, and ChromaDB to solve complex multi-step queries efficiently.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7460983995749715970/',
    linkLabel: 'Read the writeup',
    color: '#22c55e', // green
  },
];

const SLIDE_DURATION = 3000;

function AchievementCard({ item }: { item: typeof achievements[0] }) {
  return (
    <div 
      className="w-full h-[400px] rounded-2xl glass-card border-t-[3px] overflow-hidden relative flex flex-col p-8 transition-all duration-500 bg-[var(--bg-elev)] hover:shadow-xl group"
      style={{ borderTopColor: item.color }}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-5 group-hover:opacity-10"
        style={{
          background: `radial-gradient(circle at top left, ${item.color} 0%, transparent 60%)`
        }}
      />

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div 
          className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{ 
            background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
            boxShadow: `0 0 20px 0 ${item.color}30`
          }}
        >
          <FaTrophy className="text-2xl" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color}80)` }} />
        </div>
        <div>
          <div className="text-xl font-bold font-heading" style={{ color: item.color }}>
            {item.rank}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-[var(--fg)] border border-white/5">
              {item.organization}
            </span>
            <span className="text-[10px] text-[var(--fg-faint)]">
              {item.date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 text-[var(--fg)] leading-tight line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-[var(--fg-soft)] text-sm mb-6 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
        
        <div className="mt-auto">
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 border border-white/10 bg-[var(--bg-soft)] hover:bg-white/10"
            style={{ boxShadow: `0 4px 14px -6px ${item.color}40` }}
          >
            {item.linkLabel}
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AchievementsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isHovering) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % achievements.length);
      }, SLIDE_DURATION);
    }
  }, [isHovering]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovering, resetTimer]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + achievements.length) % achievements.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;
    
    if (swipeDistance > 50) {
      paginate(1);
    } else if (swipeDistance < -50) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const a1 = achievements[currentIndex];
  const a2 = achievements[(currentIndex + 1) % achievements.length];

  return (
    <section className="py-24 relative overflow-hidden" id="achievements">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-label inline-block mb-4">Recognition</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            <span className="relative">
              Achievements
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/20 -rotate-1 origin-left"></span>
            </span>
          </h2>
        </div>

        <div 
          className="relative max-w-5xl mx-auto h-[400px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 w-full h-full flex gap-6"
            >
              <div className="w-full md:w-1/2 shrink-0">
                <AchievementCard item={a1} />
              </div>
              <div className="hidden md:block md:w-1/2 shrink-0">
                <AchievementCard item={a2} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots & Progress bar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full">
            <div className="flex gap-2.5">
              {achievements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6' 
                      : 'bg-[var(--fg-faint)] hover:bg-[var(--fg-soft)]'
                  }`}
                  style={{ backgroundColor: idx === currentIndex ? achievements[idx].color : undefined }}
                  aria-label={`Go to achievement ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="w-24 h-1 bg-[var(--border)] rounded-full overflow-hidden">
              {!isHovering && (
                <div 
                  key={currentIndex} 
                  className="h-full animate-[progress-fill_3s_linear_forwards]"
                  style={{ backgroundColor: a1.color }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
