FROM python:3.7-alpine

RUN mkdir /app
WORKDIR /app

RUN apk update \
    && apk add --no-cache build-base
COPY ./requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
RUN apk del build-base && \
    rm -r /root/.cache

COPY ./main.py ./
EXPOSE 80
ENV PORT=80

ENTRYPOINT [ "python" ]
CMD [ "main.py" ]
