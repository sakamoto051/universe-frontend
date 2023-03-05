FROM node:16.13

# コマンド実行
RUN apt-get update && \
    apt-get install git && \
    apt install -y default-jre && \
    yarn global add create-react-app

WORKDIR /workspace
COPY ./ /workspace
RUN npm init -y
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npx", "next", "start"]
