# ==============================================================================
# Production Dockerfile for Next.js (Proton Apps Hub)
# ==============================================================================

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# --- Stage 1: Dependencies ---
FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

# --- Stage 2: Builder ---
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# --- Stage 3: Runner ---
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat curl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
