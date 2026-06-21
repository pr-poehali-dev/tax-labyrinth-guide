import json
import os
import psycopg


def handler(event: dict, context) -> dict:
    """Принимает вопрос и email пользователя, сохраняет в БД."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    email = (body.get('email') or '').strip()
    question = (body.get('question') or '').strip()

    if not email or not question:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Заполните все поля'}),
        }

    if len(question) > 2000:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Вопрос слишком длинный (максимум 2000 символов)'}),
        }

    with psycopg.connect(os.environ['DATABASE_URL']) as conn:
        safe_email = email.replace("'", "''")
        safe_question = question.replace("'", "''")
        conn.execute(
            f"INSERT INTO t_p47669459_tax_labyrinth_guide.questions (email, question) VALUES ('{safe_email}', '{safe_question}')"
        )

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True}),
    }