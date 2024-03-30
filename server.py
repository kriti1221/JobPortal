from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json

import jobs_dao

app = Flask(__name__)

connection = get_sql_connection()

# @app.route('/getUOM', methods=['GET'])
# def get_uom():
#     response = uom_dao.get_uoms(connection)
#     response = jsonify(response)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

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

# @app.route('/editProduct', methods=['POST'])
# def edit_product():
#     request_payload = json.loads(request.form['data'])
#     response= products_dao.edit_product(connection, request_payload)
#     response = jsonify(response)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/getAllOrders', methods=['GET'])
# def get_all_orders():
#     response = orders_dao.get_all_orders(connection)
#     response = jsonify(response)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/insertOrder', methods=['POST'])
# def insert_order():
#     request_payload = json.loads(request.form['data'])
#     order_id = orders_dao.insert_order(connection, request_payload)
#     response = jsonify({
#         'order_id': order_id
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# @app.route('/deleteProduct', methods=['POST'])
# def delete_product():
#     return_id = products_dao.delete_product(connection, request.form['product_id'])
#     response = jsonify({
#         'product_id': return_id
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

if __name__ == "__main__":
    print("Starting Python Flask Server ")
    app.run(port=5003)
