FROM node:16-buster
# RUN npm install -g @vue/cli@4.5.13
RUN npm install -g npm

WORKDIR /home/project/docs


COPY ./project/docs/package.json .
COPY ./project/docs/yarn.lock .
RUN yarn install

COPY ./project /home/project


CMD  tail -f /dev/null
# CMD  yarn dev