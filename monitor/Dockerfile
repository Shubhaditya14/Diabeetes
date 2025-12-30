FROM python:3.11-slim
WORKDIR /app
COPY monitor.py .
RUN pip install --no-cache-dir requests
CMD ["python", "monitor.py"]
