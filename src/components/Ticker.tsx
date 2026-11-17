const FRAGMENTS = [
  'INFO [api-router] GET /v1/telemetry 200 OK',
  'WARN [db-pool] slow query: over the 200ms budget',
  'ERROR [payment-gateway] upstream returned 502',
  'DEBUG [cache-worker] cache miss on key user:session:8821',
  'INFO [auth-service] JWT token validated',
  'WARN [queue-consumer] queue depth climbing',
  'INFO [billing-sync] stream buffer flushed',
  'ERROR [db-pool] connection pool exhausted',
];

/* Idle motion: a slow mono ticker of sample log lines. Pure decoration. */
export function Ticker() {
  const items = [...FRAGMENTS, ...FRAGMENTS];
  return (
    <div className="overflow-hidden border-y border-border bg-accent py-2.5" aria-hidden="true">
      <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap pr-8 font-mono text-xs font-bold text-accent-ink">
        {items.map((line, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{line}</span>
            <span className="text-accent-ink/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
