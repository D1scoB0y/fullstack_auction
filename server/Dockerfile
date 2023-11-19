FROM python:3.10

WORKDIR /app

COPY r.txt .

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r r.txt

COPY . .

CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0"]
