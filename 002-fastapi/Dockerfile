FROM python:3.9.7-buster
WORKDIR /home/src
COPY ./src /home/src/

RUN pip install "fastapi==0.68.1"
RUN pip install uvicorn[standard]

CMD uvicorn --host 0.0.0.0 main:app --forwarded-allow-ips '*' --reload 