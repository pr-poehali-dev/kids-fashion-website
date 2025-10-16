'''
Business: CRUD API for products management (get all, create, update, delete)
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with product data
'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            product_id = params.get('id')
            
            if product_id:
                cursor.execute(
                    "SELECT id, article, name, price, image_url, age_range, gender, brand, created_at, updated_at FROM products WHERE id = " + str(int(product_id))
                )
                product = cursor.fetchone()
                if not product:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Product not found'})
                    }
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(product), default=str)
                }
            else:
                cursor.execute(
                    "SELECT id, article, name, price, image_url, age_range, gender, brand, created_at, updated_at FROM products ORDER BY created_at DESC"
                )
                products = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(p) for p in products], default=str)
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            name = body_data.get('name', '').replace("'", "''")
            price = int(body_data.get('price', 0))
            image_url = body_data.get('image_url', '').replace("'", "''")
            age_range = body_data.get('age_range', '').replace("'", "''")
            gender = body_data.get('gender', '').replace("'", "''")
            brand = body_data.get('brand', '').replace("'", "''")
            
            cursor.execute("SELECT COALESCE(MAX(CAST(SUBSTRING(article FROM 3) AS INTEGER)), 999) + 1 as next_num FROM products WHERE article LIKE 'BK%'")
            result = cursor.fetchone()
            next_num = dict(result).get('next_num', 1000) if result else 1000
            article = f'BK{str(next_num).zfill(4)}'
            
            cursor.execute(
                f"INSERT INTO products (article, name, price, image_url, age_range, gender, brand) VALUES ('{article}', '{name}', {price}, '{image_url}', '{age_range}', '{gender}', '{brand}') RETURNING id, article, name, price, image_url, age_range, gender, brand, created_at, updated_at"
            )
            new_product = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(new_product), default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            product_id = int(body_data.get('id', 0))
            name = body_data.get('name', '').replace("'", "''")
            price = int(body_data.get('price', 0))
            image_url = body_data.get('image_url', '').replace("'", "''")
            age_range = body_data.get('age_range', '').replace("'", "''")
            gender = body_data.get('gender', '').replace("'", "''")
            brand = body_data.get('brand', '').replace("'", "''")
            
            cursor.execute(
                f"UPDATE products SET name = '{name}', price = {price}, image_url = '{image_url}', age_range = '{age_range}', gender = '{gender}', brand = '{brand}', updated_at = CURRENT_TIMESTAMP WHERE id = {product_id} RETURNING id, article, name, price, image_url, age_range, gender, brand, created_at, updated_at"
            )
            updated_product = cursor.fetchone()
            conn.commit()
            
            if not updated_product:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated_product), default=str)
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {}) or {}
            product_id = int(params.get('id', 0))
            
            cursor.execute(f"DELETE FROM products WHERE id = {product_id}")
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Product deleted successfully'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    finally:
        cursor.close()
        conn.close()