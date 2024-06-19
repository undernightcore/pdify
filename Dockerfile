FROM node:lts as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build

FROM node:lts

WORKDIR /usr/local/app
COPY --from=build /usr/local/app/node_modules /usr/local/app/node_modules
COPY --from=build /usr/local/app/dist /usr/local/app/dist

RUN npx @puppeteer/browsers install chrome-headless-shell@126.0.6478.55 --path /usr/bin/chrome-install

RUN apt-get update \
    && apt-get install -y wget gnupg dumb-init \
          ca-certificates \
          fonts-liberation \
          libasound2 \
          libatk-bridge2.0-0 \
          libatk1.0-0 \
          libc6 \
          libcairo2 \
          libcups2 \
          libdbus-1-3 \
          libexpat1 \
          libfontconfig1 \
          libgbm1 \
          libgcc1 \
          libglib2.0-0 \
          libgtk-3-0 \
          libnspr4 \
          libnss3 \
          libpango-1.0-0 \
          libpangocairo-1.0-0 \
          libstdc++6 \
          libx11-6 \
          libx11-xcb1 \
          libxcb1 \
          libxcomposite1 \
          libxcursor1 \
          libxdamage1 \
          libxext6 \
          libxfixes3 \
          libxi6 \
          libxrandr2 \
          libxrender1 \
          libxss1 \
          libxtst6 \
          lsb-release \
          wget \
          xdg-utils

ENV PUPPETEER_EXECUTABLE_PATH "/usr/bin/chrome-install/chrome-headless-shell/linux-126.0.6478.55/chrome-headless-shell-linux64/chrome-headless-shell"
ENV XDG_CONFIG_HOME=/tmp/.chromium
ENV XDG_CACHE_HOME=/tmp/.chromium

EXPOSE 8080

CMD node dist/index.mjs
