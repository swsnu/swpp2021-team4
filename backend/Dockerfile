FROM python:3.7

VOLUME /app
WORKDIR /app

COPY requirements.txt .
COPY . .

RUN pip install -r requirements.txt
RUN python manage.py makemigrations && python manage.py migrate

CMD uwsgi \
     --wsgi-file /app/tripick/wsgi.py \
     --http :8000