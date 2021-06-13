# Dockerfile Multistages image build - good pratices
# sources:
#   - https://codefresh.io/docker-tutorial/node_docker_multistage/
#   - https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
#   - https://www.bretfisher.com/node-docker-good-defaults/


# -------------------
# ---- Base Node ----
# -------------------
FROM node:14-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./


# ----------------------
# ---- Dependencies ----
# ----------------------
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm ci --only=production

# copy production node_modules aside
RUN cp -R node_modules prod_node_modules

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force


# --------------
# ---- Test ----
# --------------
# run linters, setup and tests
FROM dependencies AS test
COPY . .
RUN  npm run lint && npm run test


# -----------------
# ---- Release ----
# -----------------
FROM base AS release

# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules

# copy app sources
COPY . .

# expose port and define CMD
EXPOSE 3000
CMD npm start


# ------------------------------------------------
# Important: This is used just to make a VS
# ------------------------------------------------
# # Nodejs Basic Example docker
# FROM node:14-alpine
# WORKDIR /usr/src/app

# COPY ["package.json", "./"]

# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD npm start