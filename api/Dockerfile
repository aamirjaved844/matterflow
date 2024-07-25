FROM python:3.12

WORKDIR /visual-programming/back-end

COPY Pipfile Pipfile.lock ./
COPY CLI/ ./CLI/
COPY matterflow/ ./matterflow/

RUN pip install pipenv
RUN pipenv install --dev --ignore-pipfile

COPY mf/ ./mf
RUN echo "SECRET_KEY=tmp" > mf/.environment

EXPOSE 8000

WORKDIR /visual-programming/back-end/mf

CMD pipenv run python manage.py runserver 0.0.0.0:8000
