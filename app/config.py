import os
import boto3
from botocore.exceptions import ClientError
import json

#Snippet provided from AWS Secrets Manager
def get_secret():

    secret_name = "my-flask-app-bloom-secrets" #Name of the secret name from AWS dashboard
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )


    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
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
    SECRET_KEY = secrets.environ.get('SECRET_KEY', 'default_secret_key')
    API_KEY = secrets.environ.get('GOOGLE_API', '')
    OPENAI_API_KEY = secrets.environ.get('OPENAI_API_KEY', '')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)

    # Set the DATABASE_URL with a fallback for development
    #DATABASE_URL = secrets.get('DATABASE_URL', 'sqlite:///default.db')

    SQLALCHEMY_DATABASE_URI = secrets.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
