# --------------------------------------------------
# Dockerfile Multistages image build - good pratices
# --------------------------------------------------
# investigation inspirated by: https://github.com/BretFisher
# --------------------------------------------------
# basic execution - sources:
#   - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# --------------------------------------------------
# good practices - sources:
#   - https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
#   - https://codefresh.io/docker-tutorial/node_docker_multistage/
#   - https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
#   - https://www.bretfisher.com/node-docker-good-defaults/
#   - read: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
#   - read: https://dev.to/nodepractices/docker-best-practices-with-node-js-4ln4
# --------------------------------------------------


# TODO list: security
# - non user root

# TODO list: performance
# - cmd node directly ('dist/index.js')
# - tiny ( or dump init ) implementation https://github.com/krallin/tini#using-tini

# ----------------------------
# ---- STAGE 1: Base Node ----
# ----------------------------
FROM node:14-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./


# -------------------------------
# ---- STAGE 2: Dependencies ----
# -------------------------------
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm ci --only=production

# copy production node_modules aside
RUN cp -R node_modules prod_node_modules

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force


# -----------------------
# ---- STAGE 3: Test ----
# -----------------------
# run linters, setup and tests
FROM dependencies AS test
COPY . .
RUN  npm run lint && npm run test


# -------------------------------
# ---- STAGE 4: Release/Prod ----
# -------------------------------
FROM base AS release

# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules

# copy app sources
COPY . .

# expose port and define CMD
EXPOSE 3000
CMD npm start


# ------------------------------------------------
# Important: This is used just to make a VS build
# ------------------------------------------------
# # Simple Nodejs Basic Example docker image build
# FROM node:14-alpine
# WORKDIR /usr/src/app

# COPY ["package.json", "./"]

# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD npm start