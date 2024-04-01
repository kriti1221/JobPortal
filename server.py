from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json

import jobs_dao

app = Flask(__name__)

connection = get_sql_connection()


@app.route('/getJobs', methods=['GET'])
def get_products():
    response = jobs_dao.get_all_jobs(connection)
    print(response)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertJob', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    job_id = jobs_dao.insert_new_job(connection, request_payload)
    response = jsonify({
        'jobId': job_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server ")
    app.run(port=5003)
