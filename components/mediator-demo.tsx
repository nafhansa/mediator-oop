"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageSquare, Gamepad2, Speaker, Monitor, Server } from 'lucide-react'
import { cn } from "@/lib/utils"

type Log = {
  id: number
  source: string
  target: string
  message: string
  timestamp: string
}

type ComponentStatus = "idle" | "active" | "receiving"

export function MediatorDemo() {
  const [logs, setLogs] = useState<Log[]>([])
  const [activePath, setActivePath] = useState<{ from: string; to: string } | null>(null)
  
  // Component States
  const [playerStatus, setPlayerStatus] = useState<ComponentStatus>("idle")
  const [mediatorStatus, setMediatorStatus] = useState<ComponentStatus>("idle")
  const [soundStatus, setSoundStatus] = useState<ComponentStatus>("idle")
  const [graphicsStatus, setGraphicsStatus] = useState<ComponentStatus>("idle")
  const [scoreStatus, setScoreStatus] = useState<ComponentStatus>("idle")

  const addLog = (source: string, target: string, message: string) => {
    const now = new Date()
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    
    setLogs(prev => [{
      id: Date.now(),
      source,
      target,
      message,
      timestamp: timeString
    }, ...prev].slice(0, 5))
  }

  const triggerAction = async (action: "JUMP" | "COIN" | "GAME_OVER") => {
    // Reset states
    setPlayerStatus("idle")
    setMediatorStatus("idle")
    setSoundStatus("idle")
    setGraphicsStatus("idle")
    setScoreStatus("idle")

    // Step 1: Player Action -> Mediator
    setPlayerStatus("active")
    setActivePath({ from: "player", to: "mediator" })
    addLog("Player Input", "Game Mediator", `User pressed ${action}`)
    
    await new Promise(r => setTimeout(r, 800))
    setPlayerStatus("idle")
    setMediatorStatus("receiving")
    
    // Step 2: Mediator Processing
    await new Promise(r => setTimeout(r, 500))
    setMediatorStatus("active")
    setActivePath(null)

    // Step 3: Mediator -> Subsystems
    if (action === "JUMP") {
      // Parallel dispatch
      setActivePath({ from: "mediator", to: "graphics" })
      setGraphicsStatus("receiving")
      addLog("Game Mediator", "Graphics Engine", "Play 'Jump' Animation")
      
      setTimeout(() => {
        setActivePath({ from: "mediator", to: "sound" })
        setSoundStatus("receiving")
        addLog("Game Mediator", "Sound System", "Play 'Jump_SFX.wav'")
      }, 200)

    } else if (action === "COIN") {
      setActivePath({ from: "mediator", to: "score" })
      setScoreStatus("receiving")
      addLog("Game Mediator", "Score Manager", "Add 100 Points")
      
      setTimeout(() => {
        setActivePath({ from: "mediator", to: "sound" })
        setSoundStatus("receiving")
        addLog("Game Mediator", "Sound System", "Play 'Coin_Collect.wav'")
      }, 200)
    } else if (action === "GAME_OVER") {
      setGraphicsStatus("receiving")
      setSoundStatus("receiving")
      setScoreStatus("receiving")
      addLog("Game Mediator", "ALL SYSTEMS", "Trigger Game Over Sequence")
    }

    // Reset after animation
    setTimeout(() => {
      setMediatorStatus("idle")
      setGraphicsStatus("idle")
      setSoundStatus("idle")
      setScoreStatus("idle")
      setActivePath(null)
    }, 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-primary/30">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6" /> Player Input
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Simulate user interactions. Notice how the Player component 
              <span className="text-destructive font-bold"> never </span> 
              talks directly to Sound or Graphics.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => triggerAction("JUMP")}
                className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/50 rounded-lg text-primary font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-between group"
              >
                <span>PRESS JUMP</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => triggerAction("COIN")}
                className="w-full py-3 px-4 bg-secondary/10 hover:bg-secondary/20 border border-secondary/50 rounded-lg text-secondary font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-between group"
              >
                <span>COLLECT COIN</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => triggerAction("GAME_OVER")}
                className="w-full py-3 px-4 bg-destructive/10 hover:bg-destructive/20 border border-destructive/50 rounded-lg text-destructive font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-between group"
              >
                <span>GAME OVER</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/10 h-[300px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-muted-foreground ml-auto">SYSTEM_LOG.txt</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2 rounded bg-black/40 border-l-2 border-primary"
                  >
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>[{log.timestamp}]</span>
                      <span>{log.source} → {log.target}</span>
                    </div>
                    <div className="text-primary-foreground">{log.message}</div>
                  </motion.div>
                ))}
                {logs.length === 0 && (
                  <div className="text-muted-foreground italic text-center mt-10">Waiting for input...</div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Diagram */}
        <div className="lg:col-span-2 relative h-[600px] glass-panel rounded-xl border border-white/10 p-8 flex items-center justify-center bg-black/20">
          
          {/* Connection Lines SVG Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-muted-foreground" />
              </marker>
            </defs>
            
            {/* Lines from Mediator to others */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" className="stroke-muted-foreground/20 stroke-2" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" className="stroke-muted-foreground/20 stroke-2" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" className="stroke-muted-foreground/20 stroke-2" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" className="stroke-muted-foreground/20 stroke-2" />

            {/* Active Paths */}
            {activePath?.from === "player" && activePath?.to === "mediator" && (
              <motion.circle r="4" fill="#d946ef">
                <animateMotion dur="0.8s" repeatCount="1" path="M 160 120 L 400 300" />
              </motion.circle>
            )}
             {activePath?.from === "mediator" && activePath?.to === "graphics" && (
              <motion.circle r="4" fill="#06b6d4">
                <animateMotion dur="0.5s" repeatCount="1" path="M 400 300 L 640 120" />
              </motion.circle>
            )}
             {activePath?.from === "mediator" && activePath?.to === "sound" && (
              <motion.circle r="4" fill="#06b6d4">
                <animateMotion dur="0.5s" repeatCount="1" path="M 400 300 L 160 480" />
              </motion.circle>
            )}
             {activePath?.from === "mediator" && activePath?.to === "score" && (
              <motion.circle r="4" fill="#06b6d4">
                <animateMotion dur="0.5s" repeatCount="1" path="M 400 300 L 640 480" />
              </motion.circle>
            )}
          </svg>

          {/* Nodes */}
          <div className="relative z-10 w-full h-full">
            
            {/* Center: Mediator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={cn(
                "w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300 bg-black/80 backdrop-blur-md z-20",
                mediatorStatus === "active" ? "border-primary shadow-[0_0_30px_rgba(217,70,239,0.5)] scale-110" : 
                mediatorStatus === "receiving" ? "border-primary/50 scale-105" : "border-white/10"
              )}>
                <Server className={cn("w-10 h-10 mb-2 transition-colors", mediatorStatus !== "idle" ? "text-primary" : "text-muted-foreground")} />
                <span className="font-bold text-sm">Game Mediator</span>
                <span className="text-[10px] text-muted-foreground mt-1">Central Hub</span>
              </div>
            </div>

            {/* Top Left: Player Input */}
            <div className="absolute top-[10%] left-[10%]">
              <div className={cn(
                "w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 bg-black/60",
                playerStatus === "active" ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] -translate-y-2" : "border-white/10"
              )}>
                <Gamepad2 className="w-8 h-8 mb-2 text-pink-500" />
                <span className="font-bold text-xs">Player Input</span>
              </div>
            </div>

            {/* Top Right: Graphics Engine */}
            <div className="absolute top-[10%] right-[10%]">
              <div className={cn(
                "w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 bg-black/60",
                graphicsStatus === "receiving" ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105" : "border-white/10"
              )}>
                <Monitor className="w-8 h-8 mb-2 text-cyan-500" />
                <span className="font-bold text-xs">Graphics Engine</span>
              </div>
            </div>

            {/* Bottom Left: Sound System */}
            <div className="absolute bottom-[10%] left-[10%]">
              <div className={cn(
                "w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 bg-black/60",
                soundStatus === "receiving" ? "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] scale-105" : "border-white/10"
              )}>
                <Speaker className="w-8 h-8 mb-2 text-yellow-500" />
                <span className="font-bold text-xs">Sound System</span>
              </div>
            </div>

            {/* Bottom Right: Score Manager */}
            <div className="absolute bottom-[10%] right-[10%]">
              <div className={cn(
                "w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 bg-black/60",
                scoreStatus === "receiving" ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105" : "border-white/10"
              )}>
                <div className="text-2xl font-mono font-bold text-green-500 mb-1">0950</div>
                <span className="font-bold text-xs">Score Manager</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
