from flask import Flask, render_template, url_for, request, session, redirect, flash
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from form import addfoodsForm
from form import deletefoodsForm
from form import commentsfoodsForm
import bcrypt
import os

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'DongGeubSik'
app.config['MONGO_URI'] = 'mongodb+srv://test:test1@donggeubsik.fscyw.mongodb.net/DongGeubSik?retryWrites=true&w=majority'

mongo = PyMongo(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index2')
def index2():
    return render_template('index2.html')

@app.route('/sangrokone')
def foods():
    test= mongo.db.sangrokonefoods
    context = test.find()
    
    return render_template('foods.html', context=context)

@app.route('/dormitory')
def foods_dormitory():
    test= mongo.db.dormitoryfoods
    context = test.find()
    
    return render_template('foods_dormitoryfoods.html', context=context)

@app.route('/groot')
def foods_groot():
    test= mongo.db.grootfoods
    context = test.find()
    
    return render_template('foods_grootfoods.html', context=context)

@app.route('/gardencook')
def foods_gardencook():
    test= mongo.db.gardencookfoods
    context = test.find()
    
    return render_template('foods_gardencookfoods.html', context=context)

@app.route('/namsan')
def foods_namsan():
    test= mongo.db.namsanfoods
    context = test.find()
    
    return render_template('foods_namsanfoods.html', context=context)

@app.route('/pandorothy')
def foods_pandorothy():
    test= mongo.db.pandorothyfoods
    context = test.find()
    
    return render_template('foods_pandorothyfoods.html', context=context)

@app.route('/gaonnuri')
def foods_gaonnuri():
    test= mongo.db.gaonnurifoods
    context = test.find()
    
    return render_template('foods_gaonnurifoods.html', context=context)

@app.route('/bluepot')
def foods_bluepot():
    test= mongo.db.bluepotdrinks
    context = test.find()
    
    return render_template('foods_bluepotdrinks.html', context=context)

@app.route('/payment')
def payments():
    pay = mongo.db.payments
    context = pay.find()

    return render_template('payments.html', context=context)


@app.route('/add/sangrokone',methods=['POST','GET'])
def add_foods():
    if request.method == 'POST':
        add_sangrok = mongo.db.sangrokonefoods

        add_sangrok.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods'))
    
    form = addfoodsForm()
    return render_template('add_foods.html', form=form)

@app.route('/add/dormitory',methods=['POST','GET'])
def add_foods_dormitory():
    if request.method == 'POST':
        add_dormitory = mongo.db.dormitoryfoods

        add_dormitory.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_dormitory'))
    
    form = addfoodsForm()
    return render_template('add_foods_dormitory.html', form=form)

@app.route('/add/groot',methods=['POST','GET'])
def add_foods_groot():
    if request.method == 'POST':
        add_groot = mongo.db.grootfoods

        add_groot.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_groot'))
    
    form = addfoodsForm()
    return render_template('add_foods_groot.html', form=form)

@app.route('/add/gardencook',methods=['POST','GET'])
def add_foods_gardencook():
    if request.method == 'POST':
        add_gardencook = mongo.db.gardencookfoods

        add_gardencook.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_gardencook'))
    
    form = addfoodsForm()
    return render_template('add_foods_gardencook.html', form=form)

@app.route('/add/namsan',methods=['POST','GET'])
def add_foods_namsan():
    if request.method == 'POST':
        add_namsan = mongo.db.namsanfoods

        add_namsan.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_namsan'))
    
    form = addfoodsForm()
    return render_template('add_foods_namsan.html', form=form)

@app.route('/add/pandorothy',methods=['POST','GET'])
def add_foods_pandorothy():
    if request.method == 'POST':
        add_pandorothy = mongo.db.pandorothyfoods

        add_pandorothy.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_pandorothy'))
    
    form = addfoodsForm()
    return render_template('add_foods_pandorothy.html', form=form)

@app.route('/add/gaonnuri',methods=['POST','GET'])
def add_foods_gaonnuri():
    if request.method == 'POST':
        add_gaonnuri = mongo.db.gaonnurifoods

        add_gaonnuri.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_gaonnuri'))
    
    form = addfoodsForm()
    return render_template('add_foods_gaonnuri.html', form=form)

@app.route('/add/bluepot',methods=['POST','GET'])
def add_foods_bluepot():
    if request.method == 'POST':
        add_bluepot = mongo.db.bluepotdrinks

        add_bluepot.insert_one({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'ingredient': request.form.get('ingredient'),
            'url': request.form.get('url')
            })

        return redirect(url_for('foods_bluepot'))
    
    form = addfoodsForm()
    return render_template('add_foods_bluepot.html', form=form)

@app.route('/delete/sangrokone', methods=['POST','GET'])
def delete_foods():
    if request.method == 'POST':
        delete_sangrok = mongo.db.sangrokonefoods

        delete_sangrok.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods'))
    
    form = deletefoodsForm()
    return render_template('delete_foods.html', form=form)

@app.route('/delete/dormitory', methods=['POST','GET'])
def delete_foods_dormitory():
    if request.method == 'POST':
        delete_dormitory = mongo.db.dormitoryfoods

        delete_dormitory.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_dormitory'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_dormitory.html', form=form)

@app.route('/delete/groot', methods=['POST','GET'])
def delete_foods_groot():
    if request.method == 'POST':
        delete_groot = mongo.db.grootfoods

        delete_groot.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_groot'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_groot.html', form=form)

@app.route('/delete/gardencook', methods=['POST','GET'])
def delete_foods_gardencook():
    if request.method == 'POST':
        delete_gardencook = mongo.db.gardencookfoods

        delete_gardencook.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_gardencook'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_gardencook.html', form=form)

@app.route('/delete/namsan', methods=['POST','GET'])
def delete_foods_namsan():
    if request.method == 'POST':
        delete_namsan = mongo.db.namsanfoods

        delete_namsan.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_namsan'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_namsan.html', form=form)

@app.route('/delete/pandorothy', methods=['POST','GET'])
def delete_foods_pandorothy():
    if request.method == 'POST':
        delete_pandorothy = mongo.db.pandorothyfoods

        delete_pandorothy.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_pandorothy'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_pandorothy.html', form=form)

@app.route('/delete/gaonnuri', methods=['POST','GET'])
def delete_foods_gaonnuri():
    if request.method == 'POST':
        delete_gaonnuri = mongo.db.gaonnurifoods

        delete_gaonnuri.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_gaonnuri'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_gaonnuri.html', form=form)

@app.route('/delete/bluepot', methods=['POST','GET'])
def delete_foods_bluepot():
    if request.method == 'POST':
        delete_bluepot = mongo.db.bluepotdrinks

        delete_bluepot.delete_one({
            'title': request.form.get('title')
            
            })  

        return redirect(url_for('foods_bluepot'))
    
    form = deletefoodsForm()
    return render_template('delete_foods_bluepot.html', form=form)

@app.route('/comment', methods=['POST','GET'])
def comments():
    if request.method == 'POST':
        test= mongo.db.comments

        context=test.find(
            {'title': request.form.get('title')}

        )
        
        return render_template('comments_food.html', context=context)


    form = commentsfoodsForm()
    return render_template('comments.html', form=form)



@app.route('/api/auth/login',methods=['POST'] )
def login():
    users = mongo.db.users
    login_user = users.find_one({'username' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'])== login_user['password']:
            session['username'] = request.form['username']
            return redirect(url_for('index2'))
    return 'Invalid username/password combination'
  



@app.route('/api/auth/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'username' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'username' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('index2'))
        
        return 'That username already exists!'

    return render_template('register.html')
    



if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)

