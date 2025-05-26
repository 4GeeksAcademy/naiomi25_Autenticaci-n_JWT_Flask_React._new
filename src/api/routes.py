"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from sqlalchemy import select
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    try:
        body = request.get_json()
        print('datos recibidos:',body)
        name = body.get('name', None)
        password =body.get('password', None)
        email = body.get('email', None)
        last_name = body.get('last_name', None)

        if name is None or password is None or email is None or last_name is None:
            return jsonify({'msg': 'Usuario o contraseña incorrrecto'}), 400

        hashed_password = generate_password_hash(password)
    

        new_user= User( name=name,
                    password=hashed_password,
                    email = email,
                    last_name = last_name)
        
        stmt = select(User).where(User.email == email)
        result = db.session.execute(stmt)

                        
        user_register = result.scalar_one_or_none()
        if user_register:
            return jsonify({'msg': 'El usuario ya existe'}), 409
    
        db.session.add(new_user)
        db.session.commit()
        print(f"Creando usuario: {name}")
        return jsonify({'msg': 'Usuario creado correctamente'}),201
    
    
    except Exception as e:
        print("ERROR EN BACKEND:", e)  
        return jsonify({"error": "Error interno del servidor"}), 500



@api.route('/login', methods = ['POST'])
def login():


    try:

        user_email = request.json.get('email', None)
        password = request.json.get('password', None)

        if user_email is None:
            return jsonify({'msg': 'Es necesario escribir el nombre de usuario'}), 400
        if password is None:
            return jsonify({'msg': 'Es necesario escribir la contraseña'}), 400

        stm = select(User).where(User.email == user_email)
        user = db.session.execute(stm).scalar_one_or_none()

        if user is None:
            return jsonify({'msg': 'Usuario no encontrado en la base de datos'}), 401
        
        if not check_password_hash(user.password, password):
            return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400


        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id})

    except Exception as error:
         print(f'Error en el login: {error}')
         return jsonify({"msg": "Error interno del servidor"}), 500
    
@api.route('/profile',methods = [ 'GET'])
@jwt_required()
def profile ():

        user_id = get_jwt_identity()
        stm = select(User).where(User.id == user_id)
        user = db.session.execute(stm).scalar_one_or_none()
        
        if user is None :
            return jsonify({"msg": "Usuario no encontrado"}), 404

        return jsonify({
        "email": user.email,
        "name": user.name
    })


  