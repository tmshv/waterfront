FROM python:3.7-alpine

RUN apk update \
    && apk add build-base

RUN mkdir /app
WORKDIR /app

COPY ./requirements.txt ./

RUN pip3 install -r requirements.txt
COPY ./main.py ./

EXPOSE 5000

ENTRYPOINT [ "python" ]
CMD [ "main.py" ]