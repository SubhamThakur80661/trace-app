import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Search, Trash2, Activity } from 'lucide-react';
import { Magnetic, useSpotlight } from '../lib/motion';

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogEntry {
  id: string;
  time: string;
  level: LogLevel;
  service: string;
  message: string;
  latency: string;
}

const SERVICES = [
  'auth-service',
  'payment-gateway',
  'db-pool',
  'cache-worker',
  'api-router',
  'queue-consumer',
  'billing-sync',
];

const MESSAGES: Record<LogLevel, string[]> = {
  INFO: [
    'Stream buffer flushed',
    'Health check passed',
    'Worker picked up the next job',
    'Connection returned to the pool',
    'GET /v1/telemetry HTTP/1.1 200 OK',
  ],
  WARN: [
    'Retry attempt 1/3: upstream connection reset',
    'Slow query: over the 200ms budget',
    'Queue depth climbing past the usual range',
    'Token refresh took two tries',
  ],
  ERROR: [
    'Unhandled socket exception in payload parser',
    'Connection pool exhausted on postgres-primary',
    'Upstream returned 502 with no body',
    'Write failed: log volume is full',
  ],
  DEBUG: [
    'Cache miss on key: user:session:8821',
    'Retrying DNS lookup for internal host',
    'Payload parsed, 14 fields kept',
    'Heartbeat received from worker 3',
  ],
};

const LEVEL_WEIGHTS: LogLevel[] = ['INFO', 'INFO', 'INFO', 'WARN', 'WARN', 'ERROR', 'DEBUG'];

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '21:44:02.102', level: 'INFO', service: 'auth-service', message: 'JWT token validated for user_8821', latency: '12ms' },
  { id: '2', time: '21:44:02.189', level: 'WARN', service: 'payment-gateway', message: 'Retry attempt 1/3: Stripe connection reset', latency: '420ms' },
  { id: '3', time: '21:44:02.245', level: 'ERROR', service: 'db-pool', message: 'Connection pool exhausted on postgres-primary', latency: '1200ms' },
  { id: '4', time: '21:44:02.310', level: 'DEBUG', service: 'cache-worker', message: 'Cache miss on key: user:session:8821', latency: '2ms' },
  { id: '5', time: '21:44:02.401', level: 'INFO', service: 'api-router', message: 'GET /v1/telemetry HTTP/1.1 200 OK', latency: '18ms' },
];

const LEVELS: Array<LogLevel | 'ALL'> = ['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'];

const LEVEL_STYLES: Record<LogLevel, string> = {
  INFO: 'bg-sky-400/10 text-sky-300 border-sky-400/25',
  WARN: 'bg-amber-400/10 text-amber-300 border-amber-400/25',
  ERROR: 'bg-red-400/10 text-red-300 border-red-400/25',
  DEBUG: 'bg-zinc-400/10 text-zinc-300 border-zinc-400/25',
};

const ROW_TONE: Record<LogLevel, string> = {
  INFO: 'border-l-transparent',
  WARN: 'border-l-amber-400/60',
  ERROR: 'border-l-red-400/70 bg-red-400/[0.05]',
  DEBUG: 'border-l-transparent',
};

const MAX_LINES = 60;

function randomLog(): LogEntry {
  const level = LEVEL_WEIGHTS[Math.floor(Math.random() * LEVEL_WEIGHTS.length)];
  const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
  const pool = MESSAGES[level];
  const message = pool[Math.floor(Math.random() * pool.length)];
  const latency =
    level === 'ERROR'
      ? `${400 + Math.floor(Math.random() * 900)}ms`
      : level === 'WARN'
        ? `${80 + Math.floor(Math.random() * 380)}ms`
        : level === 'DEBUG'
          ? `${1 + Math.floor(Math.random() * 8)}ms`
          : `${3 + Math.floor(Math.random() * 60)}ms`;

  return {
    id: Math.random().toString(36).slice(2, 10),
    time: new Date().toISOString().split('T')[1].slice(0, 12),
    level,
    service,
    message,
    latency,
  };
}

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<LogLevel | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const spotlight = useSpotlight<HTMLDivElement>();

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setLogs((prev) => [randomLog(), ...prev].slice(0, MAX_LINES));
    }, 2200);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const counts = useMemo(() => {
    const tally: Record<LogLevel, number> = { INFO: 0, WARN: 0, ERROR: 0, DEBUG: 0 };
    for (const log of logs) tally[log.level] += 1;
    return tally;
  }, [logs]);

  const query = search.trim().toLowerCase();
  const visible = logs.filter((log) => {
    if (filter !== 'ALL' && log.level !== filter) return false;
    if (!query) return true;
    return (
      log.message.toLowerCase().includes(query) ||
      log.service.toLowerCase().includes(query)
    );
  });

  return (
    <div
      id="demo"
      ref={spotlight.ref}
      onMouseMove={spotlight.onMove}
      style={{ '--mx': '50%', '--my': '0%' } as CSSProperties}
      className="glass-console relative w-full scroll-mt-20 overflow-hidden font-mono text-xs"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />

      <div className="glass-bar relative flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2" aria-label={isStreaming ? 'Stream live' : 'Stream paused'}>
            <span className="relative flex h-2 w-2">
              {isStreaming && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isStreaming ? 'bg-accent' : 'bg-amber-400'
                }`}
              />
            </span>
            <span className={`font-sans text-xs font-bold tracking-[0.18em] ${isStreaming ? 'text-accent' : 'text-amber-300'}`}>
              {isStreaming ? 'LIVE' : 'PAUSED'}
            </span>
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
          <span className="text-muted">local-dev-cluster.log</span>
          <span className="hidden text-muted/50 md:inline">new line every 2.2s</span>
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={4}>
            <button
              onClick={() => setLogs([])}
              className="glass-chip flex items-center gap-1.5 border border-white/15 px-2.5 py-1.5 text-muted transition-colors hover:text-foreground"
              aria-label="Clear log buffer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </Magnetic>
          <Magnetic strength={4}>
            <button
              onClick={() => setIsStreaming((s) => !s)}
              className="glass-chip flex items-center gap-1.5 border border-white/15 px-2.5 py-1.5 text-foreground transition-colors hover:border-accent/60"
              aria-label={isStreaming ? 'Pause stream' : 'Resume stream'}
            >
              {isStreaming ? (
                <Pause className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Play className="h-3.5 w-3.5 text-accent" />
              )}
              <span>{isStreaming ? 'Pause' : 'Resume'}</span>
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="glass-bar relative flex flex-col gap-3 border-b border-white/15 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service or message"
            aria-label="Search logs"
            className="glass-chip w-full border border-white/15 py-2 pl-9 pr-3 text-foreground placeholder:text-muted/60 focus:border-accent/70 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filter by level">
          {LEVELS.map((lvl) => {
            const active = filter === lvl;
            const count = lvl === 'ALL' ? logs.length : counts[lvl];
            return (
              <Magnetic key={lvl} strength={3}>
                <button
                  onClick={() => setFilter(lvl)}
                  aria-pressed={active}
                  className={`border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                    active
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-transparent text-muted hover:bg-white/[0.06] hover:text-foreground'
                  }`}
                >
                  {lvl}
                  <span className={active ? 'ml-1.5 text-accent-ink/70' : 'ml-1.5 text-muted/50'}>
                    {count}
                  </span>
                </button>
              </Magnetic>
            );
          })}
        </div>
      </div>

      {/* Log stream area: solid background, never frosted — the streaming
          lines must stay crisp and fully readable. Only the console frame
          and its bars are glass. */}
      <div className="relative bg-panel">
        <div className="log-spotlight pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden="true" />
        <div className="scanline pointer-events-none absolute inset-x-0 z-10 h-px bg-accent/25" aria-hidden="true" />
        <div className="log-scroll max-h-[420px] min-h-[280px] overflow-y-auto px-2 py-2 sm:px-3">
          {visible.length === 0 ? (
            <div className="flex min-h-[264px] flex-col items-center justify-center gap-2 px-4 text-center">
              <Activity className="h-5 w-5 text-muted/60" />
              <p className="font-sans text-sm text-muted">Nothing matches that filter.</p>
              <p className="font-sans text-xs text-muted/60">
                Try a different level, or clear the search box.
              </p>
            </div>
          ) : (
            <ol className="space-y-px">
              {visible.map((log) => (
                <motion.li
                  key={log.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className={`flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-r-sm border-l-2 px-2 py-1.5 text-[11px] leading-relaxed hover:bg-border/25 sm:flex-nowrap sm:text-xs ${ROW_TONE[log.level]}`}
                >
                  <span className="shrink-0 tabular-nums text-muted/70">{log.time}</span>
                  <span
                    className={`w-12 shrink-0 border px-1.5 py-px text-center text-[10px] font-bold tracking-wide ${LEVEL_STYLES[log.level]}`}
                  >
                    {log.level}
                  </span>
                  <span className="shrink-0 text-accent/80">[{log.service}]</span>
                  <span className="min-w-0 flex-1 break-words text-foreground/90">{log.message}</span>
                  <span className="shrink-0 tabular-nums text-muted/60">{log.latency}</span>
                </motion.li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="glass-bar relative flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/15 px-4 py-2.5 text-[10px] text-muted">
        <span>
          {visible.length} of {logs.length} lines shown
        </span>
        <span className="flex items-center gap-3">
          <span>
            <span className="font-bold text-red-300">{counts.ERROR} errors</span>
            {' · '}
            <span className="font-bold text-amber-300">{counts.WARN} warnings</span>
          </span>
          <span className="hidden sm:inline">Buffer keeps the last {MAX_LINES} lines</span>
        </span>
      </div>
    </div>
  );
}
