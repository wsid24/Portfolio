'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'DBQueryGPT',
    tagline: 'Agentic RAG pipeline',
    description: 'Agentic RAG pipeline, LangGraph, Gemini, ChromaDB, FastAPI, Python, MySQL, React.',
    tech: ['LangGraph', 'Gemini', 'ChromaDB', 'FastAPI', 'React'],
    repoLink: 'https://github.com/wsid24/DBQueryGPT',
    liveLink: null,
    imageUrl: '/dbquerygpt.png',
    badge: 'AI / RAG',
  },
  {
    id: 2,
    title: 'CourseForge',
    tagline: 'Text-to-Course platform',
    description: 'Text-to-Course platform, React, Node.js, Groq, Gemini, MongoDB, Redis, Auth0, LangChain.',
    tech: ['React', 'Node.js', 'Groq', 'LangChain'],
    repoLink: 'https://github.com/wsid24/Text-To-Course',
    liveLink: 'https://text2course-nu.vercel.app',
    imageUrl: '/courseforge.png',
    badge: 'Full-stack · GenAI',
  },
  {
    id: 3,
    title: 'Orchestrate AI Support Agent',
    tagline: 'HackerRank Hackathon Rank 151/1349',
    description: 'Python, LangChain, ChromaDB, Llama 3, Groq, Hybrid Retrieval.',
    tech: ['Python', 'LangChain', 'Llama 3', 'Groq'],
    repoLink: 'https://github.com/wsid24/orchestrate_hackerrank',
    liveLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7460983995749715970/',
    imageUrl: '/orchestrate.png',
    badge: 'Hackathon · AI Agent',
  },
  {
    id: 4,
    title: 'Collaborative Board — SLATE',
    tagline: 'Real-time multi-user canvas',
    description: 'Real-time multi-user canvas, React, Node.js, Express, Socket.IO, MongoDB, JWT.',
    tech: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    repoLink: 'https://github.com/wsid24/WB',
    liveLink: 'https://collaborativewhiteboard-five.vercel.app',
    imageUrl: '/slate.png',
    badge: 'Full-stack · Real-time',
  },
  {
    id: 5,
    title: "Rubik's Cube Solver",
    tagline: 'IDA* search algorithm',
    description: "C++, CMake, IDA*, BFS, DFS based solver for Rubik's cube.",
    tech: ['C++', 'CMake', 'IDA*'],
    repoLink: 'https://github.com/wsid24/rubiks_cube',
    liveLink: null,
    imageUrl: '/rubik.jpg',
    badge: 'Algorithms · C++',
  },
];

const SLIDE_DURATION = 3000;

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="w-full h-[450px] rounded-2xl glass-card overflow-hidden flex flex-col border border-white/5 relative group bg-[var(--bg-elev)] hover:border-[var(--accent)]/30 transition-colors">
      <div className="relative h-48 shrink-0 overflow-hidden bg-bg/50">
        {project.imageUrl ? (
          <>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elev)] to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-bg flex items-center justify-center p-6">
            <h3 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-warm text-center leading-tight">
              {project.title}
            </h3>
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col relative z-10">
        <div className="mb-3 inline-block px-2.5 py-1 rounded-full text-[10px] font-medium bg-accent/10 text-[var(--accent)] border border-accent/20 w-max">
          {project.badge}
        </div>
        
        <h3 className="text-xl font-bold font-heading mb-1 text-[var(--fg)] line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-[var(--accent-warm)] text-[11px] md:text-xs font-medium mb-3 line-clamp-1">
          {project.tagline}
        </p>
        
        <p className="text-[var(--fg-soft)] text-xs mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[10px] rounded bg-white/5 border border-[var(--border)] text-[var(--fg-soft)]">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-auto">
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-1.5 text-xs font-medium text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors">
              <FaGithub className="text-[14px]" />
              Source
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-1.5 text-xs font-medium text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors">
              <FaExternalLinkAlt className="text-[12px]" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
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
        setCurrentIndex((prev) => (prev + 1) % projects.length);
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
    setCurrentIndex((prev) => (prev + newDirection + projects.length) % projects.length);
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

  const p1 = projects[currentIndex];
  const p2 = projects[(currentIndex + 1) % projects.length];

  return (
    <section className="py-24 relative overflow-hidden" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="section-label inline-block mb-4">Selected Work</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            <span className="relative">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[var(--accent)]/20 -rotate-1 origin-left"></span>
            </span>
          </h2>
        </div>

        <div 
          className="relative max-w-5xl mx-auto h-[450px] group"
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
                <ProjectCard project={p1} />
              </div>
              <div className="hidden md:block md:w-1/2 shrink-0">
                <ProjectCard project={p2} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots & Progress bar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full">
            <div className="flex gap-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-[var(--accent)] w-6' 
                      : 'bg-[var(--fg-faint)] hover:bg-[var(--fg-soft)]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="w-32 h-1 bg-[var(--border)] rounded-full overflow-hidden">
              {!isHovering && (
                <div 
                  key={currentIndex} 
                  className="h-full bg-[var(--accent)]/80 animate-[progress-fill_3s_linear_forwards]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
