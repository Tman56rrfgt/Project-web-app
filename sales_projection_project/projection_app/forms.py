from django import forms

class SalesForm(forms.Form):
    sales_data = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'placeholder': 'Enter sales data separated by commas'}),
        label='Sales per month',
    )
    months = forms.ChoiceField(
        choices=[(12, '12 months'), (24, '24 months'), (36, '36 months'), (48, '48 months'), (60, '60 months')],
        label='Projection period'
    )
    graph_type = forms.ChoiceField(
        choices=[('bar', 'Bar Graph'), ('hist', 'Histogram'), ('heatmap', 'Heatmap'), ('line', 'Line Graph'), ('scatter', 'Scatter Plot')],
        label='Graph Type',
        required=True
    )
    # Add field to select image file format
    file_format = forms.ChoiceField(
        choices=[('png', 'PNG'), ('jpg', 'JPG')],
        label='Image Format',
        required=True
    )
    # New field to pick the starting month
    starting_month = forms.ChoiceField(choices=[
        ('1', 'January'), ('2', 'February'), ('3', 'March'),
        ('4', 'April'), ('5', 'May'), ('6', 'June'),
        ('7', 'July'), ('8', 'August'), ('9', 'September'),
        ('10', 'October'), ('11', 'November'), ('12', 'December')
    ], label='Starting Month')
