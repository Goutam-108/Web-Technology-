import mysql.connector
from flask import Flask, jsonify, request
import os

def getConnection():
    return mysql.connector.connect(
        host = "localhost",
        port = 3306,
        user = "root",
        passwd = "Goutam@#4455",
        database = "schema_db",
        use_pure = True
    )

def queryExecutor(query, param=None):
    with getConnection() as con:
        with con.cursor(dictionary = True) as cur:
            cur.execute(query, param if param else ())
            if cur.description:
                return cur.fetchall()
            else:
                con.commit()
                return f"Rows affected : {cur.rowcount}"

def createResult(error, data):
    if error is None:
        return jsonify(status="success", data=data)
    else:
        return jsonify(status="error", error=error)

