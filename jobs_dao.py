from sql_connection import get_sql_connection

def get_all_jobs(connection):
    cursor = connection.cursor()
    query=("select * from jobdetail")
    cursor.execute(query)
    response = []
    for (jobId, company ,profile , salary , experience) in cursor:
        response.append({
            'jobId': jobId,
            'company': company,
            'profile': profile,
            'salary': salary,
            'experience': experience
        })
    return response


# def edit_product(connection, product):
#     cursor = connection.cursor()
#     query = ("UPDATE products SET"
#             "(name, uom_id, price_per_unit)"
#             "VALUES (%s, %s, %s)"
#             "WHERE product_id="+ str(product['product_id']))
#     data = (product['product_name'], product['uom_id'], product['price_per_unit'])
#     cursor.execute(query, data)
#     response = []
#     for (product_id, name, uom_id, price_per_unit, uom_name) in cursor:
#         response.append({
#             'product_id': product_id,
#             'name': name,
#             'uom_id': uom_id,
#             'price_per_unit': price_per_unit,
#             'uom_name': uom_name
#         })
#     connection.commit()

#     return response


def insert_new_job(connection, product):
    cursor = connection.cursor()
    query= ("INSERT INTO jobdetail "
             "(company, profile, salary,experience)"
             "VALUES (%s, %s, %s,%s)")
    data = (product['company'], product['profile'], product['salary'],product['experience'])

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

# def delete_product(connection, product_id):
#     cursor = connection.cursor()
#     query = ("DELETE FROM products where product_id=" + str(product_id))
#     cursor.execute(query)
#     connection.commit()

#     return cursor.lastrowid

if __name__ == '__main__':
    connection = get_sql_connection()
    print(get_all_jobs(connection))
    # print(edit_product(connection,{
    #     'product_name': 'potatoes',
    #     'uom_id': '1',
    #     'price_per_unit': 0,
    #     'product_id': 9
    # }))
    # print(insert_new_job(connection, {
    #     'company': 'potatoes',
    #     'profile': 'sde',
    #     'salary': 100000,
    #     'experience':2
    # }))
