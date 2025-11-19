import { ThreeBackground } from "@/components/three-background"
import { MediatorDemo } from "@/components/mediator-demo"
import { ArrowDown, Code2, Layers, ShieldCheck } from 'lucide-react'
/* eslint-disable react/no-unescaped-entities */

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <ThreeBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm">
          <span className="text-primary font-mono text-sm tracking-wider">DESIGN PATTERNS SERIES</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 neon-text">
          MEDIATOR
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Tame the chaos of complex dependencies. <br/>
          <span className="text-white">Centralize control</span> like a game server.
        </p>

        <div className="flex gap-4">
          <a href="#tutorial" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold tracking-wide hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            START TUTORIAL
          </a>
          <a href="#implementation" className="px-8 py-4 bg-secondary/10 border border-secondary/50 text-secondary rounded-lg font-bold tracking-wide hover:bg-secondary/20 transition-all backdrop-blur-sm">
            VIEW CODE
          </a>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Explanation Section */}
  <section id="tutorial" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-4">The Problem: <span className="text-destructive">Chaos</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In complex systems like Arcade Games, objects often need to communicate. 
                If every object talks to every other object (Player talks to Sound, Sound talks to Score, Score talks to Graphics), 
                you get a <span className="text-white font-bold">Many-to-Many</span> mess.
              </p>
              <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
                <h4 className="font-bold text-destructive mb-2">Without Mediator:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Tight coupling between components</li>
                  <li>Hard to maintain and extend</li>
                  <li>&quot;Spaghetti Code&quot; architecture</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[300px] glass-panel rounded-2xl flex items-center justify-center p-8">
              {/* Visual representation of chaos - CSS only for simplicity */}
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">A</div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">B</div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">C</div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">D</div>
                
                {/* Messy lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="currentColor" strokeWidth="1" />
                  <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="currentColor" strokeWidth="1" />
                  <line x1="10%" y1="10%" x2="90%" y2="10%" stroke="currentColor" strokeWidth="1" />
                  <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="currentColor" strokeWidth="1" />
                  <line x1="10%" y1="10%" x2="10%" y2="90%" stroke="currentColor" strokeWidth="1" />
                  <line x1="90%" y1="10%" x2="90%" y2="90%" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-destructive font-bold text-xl rotate-12 border-4 border-destructive p-2 rounded">SPAGHETTI!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[300px] glass-panel rounded-2xl flex items-center justify-center p-8">
               {/* Visual representation of order */}
               <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">A</div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">B</div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">C</div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">D</div>
                
                {/* Clean lines to center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-primary">MEDIATOR</span>
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="var(--color-primary)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl font-bold mb-4">The Solution: <span className="text-primary">Mediator</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Mediator pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-bold mb-1">Decoupled</h4>
                  <p className="text-xs text-muted-foreground">Components don't know about each other.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <Layers className="w-6 h-6 text-secondary mb-2" />
                  <h4 className="font-bold mb-1">Centralized</h4>
                  <p className="text-xs text-muted-foreground">Logic is in one place, easier to manage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 py-24 bg-black/40 border-y border-white/5 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Simulation</h2>
          <p className="text-muted-foreground">Observe how the Mediator handles the traffic between game systems.</p>
        </div>
        
        <MediatorDemo />
      </section>

      {/* Code Example Section */}
  <section id="implementation" className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Implementation</h2>
          </div>
          
          <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
            <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">GameMediator.ts</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-blue-100">
{`interface Mediator {
  notify(sender: object, event: string): void;
}

class GameMediator implements Mediator {
  private graphics: GraphicsEngine;
  private sound: SoundSystem;
  private score: ScoreManager;

  constructor(graphics: GraphicsEngine, sound: SoundSystem, score: ScoreManager) {
    this.graphics = graphics;
    this.sound = sound;
    this.score = score;
  }

  public notify(sender: object, event: string): void {
    if (event === "JUMP") {
      this.graphics.playAnimation("jump");
      this.sound.playSound("jump_sfx");
    } 
    
    else if (event === "COIN_COLLECTED") {
      this.score.addPoints(100);
      this.sound.playSound("coin_sfx");
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center text-muted-foreground border-t border-white/5 bg-black/40">
        <p>© 2025 Design Patterns Arcade. Built with Next.js & Three.js</p>
      </footer>
    </main>
  )
}
