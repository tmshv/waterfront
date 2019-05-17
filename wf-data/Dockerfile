FROM python:3.7-alpine

RUN apk update \
    && apk add --no-cache build-base

RUN mkdir /app
WORKDIR /app

COPY ./requirements.txt ./

RUN pip3 install --no-cache-dir -r requirements.txt
COPY ./main.py ./

EXPOSE 80
ENV PORT=80

ENTRYPOINT [ "python" ]
CMD [ "main.py" ]