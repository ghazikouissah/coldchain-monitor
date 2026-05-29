FROM python:3.11-alpine
WORKDIR /app
COPY analyzer/requirements.txt .
RUN pip install -r requirements.txt
COPY shared/ ./shared/
COPY analyzer/ .
CMD ["python3", "mqtt_client.py"]