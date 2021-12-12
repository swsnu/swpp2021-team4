# 🚂 Tripick: Pick your trip! 

[![Build Status](https://travis-ci.com/swsnu/swpp2021-team4.svg?branch=main)](https://travis-ci.com/swsnu/swpp2021-team4)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team4&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team4)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team4/badge.svg?branch=main&sanitize=true)](https://coveralls.io/github/swsnu/swpp2021-team4?branch=main)

https://tripick.shop   


## How to Start

### Backend
```
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### Frontend
```
cd frontend
npm i
yarn install
yarn start
```

## Deployment

### Backend
```
cd backend
docker build -t backend .
docker run -d -p 8000:8000 --rm --name backend_container backend:latest
```
### Frontend
```
cd frontend
docker build -t frontend .
docker run -p 443:443 -v '/etc/letsencrypt:/etc/letsencrypt' --rm -d --name frontend_container frontend
```
