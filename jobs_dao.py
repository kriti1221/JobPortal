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

def insert_new_job(connection, product):
    cursor = connection.cursor()
    query= ("INSERT INTO jobdetail "
             "(company, profile, salary,experience)"
             "VALUES (%s, %s, %s,%s)")
    data = (product['company'], product['profile'], product['salary'],product['experience'])

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

if __name__ == '__main__':
    connection = get_sql_connection()
    print(get_all_jobs(connection))
