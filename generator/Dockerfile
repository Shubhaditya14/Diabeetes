FROM python:3.11-slim
WORKDIR /app
COPY generator.py .
RUN pip install --no-cache-dir requests pandas
CMD ["python", "generator.py"]
