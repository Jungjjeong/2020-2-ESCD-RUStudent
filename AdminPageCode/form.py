from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, EqualTo


class addfoodsForm(FlaskForm):

    title = StringField('title',validators=[DataRequired()])
    description = StringField('description',validators=[DataRequired()])
    price = IntegerField('price',validators=[DataRequired()])
    ingredients = TextAreaField('Ingredients',validators=[DataRequired()])
    url = StringField('url')
    submit = SubmitField('Add food')




class deletefoodsForm(FlaskForm):

    title = StringField('title',validators=[DataRequired()])
    
    submit = SubmitField('Delete food')




class commentsfoodsForm(FlaskForm):

    title = StringField('title',validators=[DataRequired()])

    submit = SubmitField('Go to Review')