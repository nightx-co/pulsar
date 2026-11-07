# use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app


# install development dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile


# install production dependencies into another temp directory
FROM base AS install-prod
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production


# 1. Copy project files first, THEN restore node_modules on top so they aren't overwritten
FROM base AS prerelease
COPY . .
COPY --from=install /temp/dev/node_modules node_modules

# Install the published Pulsar package inside the image only.
# This does NOT change your local package.json or bun.lock.
RUN bun add @nightx.co/pulsar

# Create the missing ../../environment_vars module expected by index.ts.
# index.ts is at /usr/src/app/index.ts, so ../../ resolves to /usr/src.
RUN mkdir -p /usr/src && cat > /usr/src/environment_vars.ts <<'EOF'
export const POSTGRESSQL_TCP = process.env.POSTGRESSQL_TCP;
export const REDIS_TCP = process.env.REDIS_TCP;
export const API_KEY = process.env.API_KEY;
EOF

# build the project (dependencies and files are now fully intact)
ENV NODE_ENV=production
RUN bun run build


# copy production dependencies and built artifacts into final image
FROM base AS release
COPY --from=install-prod /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist dist
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 9500/tcp
ENTRYPOINT [ "bun", "run", "dist/index.js" ]