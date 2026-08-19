import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Search, ShieldCheck, Cpu } from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
  latency: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '21:44:02.102', level: 'INFO', service: 'auth-service', message: 'JWT token validated for user_8821', latency: '12ms' },
  { id: '2', time: '21:44:02.189', level: 'WARN', service: 'payment-gateway', message: 'Retry attempt 1/3: Stripe connection reset', latency: '420ms' },
  { id: '3', time: '21:44:02.245', level: 'ERROR', service: 'db-pool', message: 'Connection pool exhausted on postgres-primary', latency: '1200ms' },
  { id: '4', time: '21:44:02.310', level: 'DEBUG', service: 'cache-worker', message: 'Cache miss on key: user:session:8821', latency: '2ms' },
  { id: '5', time: '21:44:02.401', level: 'INFO', service: 'api-router', message: 'GET /v1/telemetry HTTP/1.1 200 OK', latency: '18ms' },
];

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const services = ['auth-service', 'api-router', 'queue-consumer', 'billing-sync'];
      const levels: Array<'INFO' | 'WARN' | 'ERROR'> = ['INFO', 'INFO', 'WARN', 'ERROR'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const randomService = services[Math.floor(Math.random() * services.length)];
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toISOString().split('T')[1].slice(0, 12),
        level: randomLevel,
        service: randomService,
        message: randomLevel === 'ERROR' ? 'Unhandled socket exception in payload parser' : 'Stream buffer flushed successfully',
        latency: `${Math.floor(Math.random() * 40 + 5)}ms`,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 2200);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filter === 'ALL' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || log.service.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div id="demo" className="w-full max-w-5xl mx-auto border border-border rounded-xl bg-surface/90 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-muted font-sans text-xs">local-dev-cluster.log</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-muted hover:text-foreground transition-colors"
          >
            {isStreaming ? <Pause className="h-3 w-3 text-amber-400" /> : <Play className="h-3 w-3 text-emerald-400" />}
            <span>{isStreaming ? 'Pause Stream' : 'Resume'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border bg-surface p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            placeholder="Filter logs by service or text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-1.5 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1">
          {['ALL', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                filter === lvl ? 'bg-accent text-white' : 'text-muted hover:bg-border/50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="p-2 sm:p-4 min-h-[280px] space-y-1.5 overflow-x-auto">
        {filteredLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-3 rounded p-2 hover:bg-border/30 transition-colors text-[11px] sm:text-xs border-b border-border/20 last:border-0"
          >
            <span className="text-muted/70 shrink-0">{log.time}</span>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                log.level === 'ERROR'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : log.level === 'WARN'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}
            >
              {log.level}
            </span>
            <span className="text-accent/90 shrink-0">[{log.service}]</span>
            <span className="text-foreground flex-1 break-all">{log.message}</span>
            <span className="text-muted/50 text-[10px] shrink-0 ml-auto">{log.latency}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-background/40 px-4 py-2 text-[10px] text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> CPU: 0.8%</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Zero data leaves localhost</span>
        </div>
        <span>Buffer: {logs.length}/1000 lines</span>
      </div>
    </div>
  );
}