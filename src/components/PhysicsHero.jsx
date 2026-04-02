import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';

const PhysicsHero = () => {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      }
    });

    // Create ground and walls
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });

    // AI Brain Orb in the center
    const orb = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 60, {
      isStatic: true,
      render: {
        fillStyle: '#8B5CF6',
        strokeStyle: '#06B6D4',
        lineWidth: 5,
      },
      label: 'AI_BRAIN'
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, orb]);

    // Falling blocks labels (Hinglish/English mix for impact)
    const labels = [
      "Rote Learning", "Boring Lectures", "Theory Only", "Old Syllabus", 
      "Coaching Fees", "Exam Stress", "No Practical", "Ratna Mana Hai"
    ];

    const blocks = labels.map((label, i) => {
      return Bodies.rectangle(
        window.innerWidth / 2 + (Math.random() - 0.5) * 400,
        -100 - (i * 100),
        150,
        60,
        {
          chamfer: { radius: 10 },
          render: {
            fillStyle: '#1E293B',
            strokeStyle: '#334155',
            lineWidth: 2,
            text: {
                content: label,
                color: '#F1F5F9',
                size: 14,
                family: 'Inter'
            }
          }
        }
      );
    });

    Composite.add(engine.world, blocks);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Collision shattering effect (conceptual)
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA.label === 'AI_BRAIN' || pair.bodyB.label === 'AI_BRAIN') {
          const other = pair.bodyA.label === 'AI_BRAIN' ? pair.bodyB : pair.bodyA;
          // Simple vanish for now, could add particles later
          if (other.isStatic === false) {
             Composite.remove(engine.world, other);
          }
        }
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-primary">
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 opacity-40 pointer-events-auto"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
            <h1 className="font-space text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {t.heroTitle}
            </h1>
            <p className="text-accent-cyan text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto italic drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {t.heroSub}
            </p>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent-cyan/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

export default PhysicsHero;
