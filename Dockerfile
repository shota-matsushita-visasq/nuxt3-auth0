# 依存パッケージのインストール
FROM node:16.13.2-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ビルド
FROM node:16.13.2-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG _AUTH0_DOMAIN
ARG _AUTH0_CLIENT_ID
ARG _AUTH0_AUDIENCE
ARG _AUTH0_CUSTOM_CLAIM_NAMESPACE

ENV AUTH0_DOMAIN ${_AUTH0_DOMAIN}
ENV AUTH0_CLIENT_ID ${_AUTH0_CLIENT_ID}
ENV AUTH0_AUDIENCE ${_AUTH0_AUDIENCE}
ENV AUTH0_CUSTOM_CLAIM_NAMESPACE ${_AUTH0_CUSTOM_CLAIM_NAMESPACE}

RUN npm run build

# 起動
FROM node:16.13.2-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./output
EXPOSE 8080
ENV HOST=0.0.0.0
ENV PORT 8080
CMD ["node", "output/server/index.mjs"]
