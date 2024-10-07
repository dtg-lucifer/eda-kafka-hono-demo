FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]