from dotenv import load_dotenv
import os
import boto3
from botocore.exceptions import ClientError
import json

# Config.py file contains all the LOCAL and PROD Configurations

# Load .env dile for local development
load_dotenv()

#Snippet provided from AWS Secrets Manager
def get_secret():

    secret_name = "my-flask-app-bloom-secrets" #Name of the secret name from AWS dashboard
    region_name = "us-east-1"

    if os.getenv("ENV") == "LOCAL":
        # If running locally, skip AWS Secrets Manager
        print("Running locally: Skipping AWS Secrets Manager.")
        # print(os.getenv("SECRET_KEY"))
        # print(os.getenv("DATABASE_URL"))
        return {}

    # If not running locally, Create a Secrets Manager client & Fetch secrets from AWS
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)


    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = get_secret_value_response['SecretString']
        return json.loads(secret)
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        print(f"Error fetching secrets: {e}")
        return {}

# Fetch secrets from AWS Secrets Manager
secrets = get_secret()

class Config:
    # If secrets are not fetched, fall back to environment variables or defaults
    SECRET_KEY = secrets.get("SECRET_KEY") or os.environ.get("SECRET_KEY", "default_secret_key")
    API_KEY = secrets.get("GOOGLE_API") or os.environ.get("GOOGLE_API", "")
    OPENAI_API_KEY = secrets.get("OPENAI_API_KEY") or os.environ.get("OPENAI_API_KEY", "")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)

    # Database Config: Set the DATABASE_URL with a local fallback for development
    DATABASE_URL = secrets.get("DATABASE_URL") or os.environ.get("DATABASE_URL", "sqlite:///default.db")
    SQLALCHEMY_DATABASE_URI = DATABASE_URL.replace("postgres://", "postgresql://") if "postgres://" in DATABASE_URL else DATABASE_URL
    SQLALCHEMY_ECHO = True
