FROM ghcr.io/pgmq/pg18-pgmq:latest

USER root

RUN apt-get update && apt-get install -y \
    build-essential \
    clang \
    git \
    curl \
    pkg-config \
    libcurl4-openssl-dev \
    libssl-dev \
    postgresql-server-dev-18 \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/supabase/pg_net.git /tmp/pg_net \
    && cd /tmp/pg_net \
    && make \
    && make install \
    && cd / \
    && rm -rf /tmp/pg_net

USER postgres