FROM python:3.9.7-buster
WORKDIR /home/src

RUN pip install "fastapi==0.70.0"
RUN pip install uvicorn[standard]
RUN pip install "pymongo==3.12.0"


COPY ./src /home/src/
EXPOSE 8000
CMD uvicorn --host 0.0.0.0 main:app --forwarded-allow-ips '*' 