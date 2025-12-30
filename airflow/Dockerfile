FROM apache/airflow:2.9.1-python3.11

# Install Python packages during build. The base image prevents
# running pip as root by default; set PIP_ROOT_USER_ACTION=ignore
# so we can install packages into the image and then switch back
# to the `airflow` user.
USER root
ENV PIP_ROOT_USER_ACTION=ignore
RUN pip install --no-cache-dir \
    pandas numpy scikit-learn joblib \
    imbalanced-learn comet-ml matplotlib && \
    python -m pip cache purge || true

USER airflow
