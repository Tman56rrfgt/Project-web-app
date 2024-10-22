import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns  # For heatmap
from django.shortcuts import render
from sklearn.linear_model import LinearRegression
from io import BytesIO
import base64
from .forms import SalesForm
from django.http import HttpResponse
import os
from django.conf import settings

# Function to simulate seasonality (e.g. Christmas) effect with an offset for starting month
def add_seasonality(sales, months, amplitude=0.1, period=12, start_month=1):
    """Add a simple seasonal effect to the sales data with a phase shift for starting month."""
    # Shift the seasonality to start at the correct month
    seasonal_effect = amplitude * np.sin(2 * np.pi * (np.arange(len(sales) + months) + (start_month - 1)) / period)
    return sales + seasonal_effect[:len(sales)], seasonal_effect[len(sales):]

# Function to add random noise to projections for more realism
def add_random_noise(future_sales, noise_level=0.05):
    """Add random noise to the future sales projections."""
    noise = np.random.normal(0, noise_level * np.mean(future_sales), len(future_sales))
    return future_sales + noise

# Main view for handling the sales projection
def sales_projection_view(request):
    if request.method == 'POST':
        form = SalesForm(request.POST)
        if form.is_valid():
            # Extract sales data from the form and convert it into a NumPy array
            sales_data = form.cleaned_data['sales_data']
            sales = np.array([float(x) for x in sales_data.split(',')])

            # Get the number of months for the projection
            months = int(form.cleaned_data['months'])

            # Prepare the data for the linear regression model
            X = np.arange(1, len(sales) + 1).reshape(-1, 1)  # Time periods (e.g., month numbers)
            y = sales.reshape(-1, 1)  # Sales data

            # Fit the linear regression model
            model = LinearRegression()
            model.fit(X, y)

            # Generate future time periods for the projection
            future_X = np.arange(len(sales) + 1, len(sales) + months + 1).reshape(-1, 1)
            future_sales = model.predict(future_X).flatten()

            # Add seasonality to both historical sales and future projections
            sales_with_seasonality, future_seasonal_effect = add_seasonality(sales, months)
            future_sales_with_seasonality = future_sales + future_seasonal_effect

            # Add random noise to the future sales to simulate market fluctuation
            future_sales_noisy = add_random_noise(future_sales_with_seasonality)

            # Determine the trend (positive, negative, stagnant)
            slope = model.coef_[0][0]
            if slope > 0:
                trend = "positive (improving)"
            elif slope < 0:
                trend = "negative (declining)"
            else:
                trend = "stagnant"

            # Generate the plot
            fig, ax = plt.subplots()
            graph_type = form.cleaned_data['graph_type']
            create_sales_graph(ax, graph_type, sales_with_seasonality, future_sales_noisy, X, future_X, months)

            # Save plot to a buffer
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            image_png = buf.getvalue()
            buf.close()

            # Encode the image in base64 for rendering in HTML
            graph = base64.b64encode(image_png).decode('utf-8')

            # Prepare future sales data for display as a list
            future_sales_list = [(f"Month {i}", f"{sale:.2f}") for i, sale in enumerate(future_sales_noisy, start=len(sales) + 1)]

            return render(request, 'projection_app/sales_projection.html', {
                'form': form,
                'graph': graph,
                'future_sales': future_sales_noisy,
                'future_sales_list': future_sales_list,  # Pass the list of future sales to the template
                'trend': trend,
            })
        
    else:
        form = SalesForm()

    return render(request, 'projection_app/sales_projection.html', {'form': form})

# Function to handle the graph type and its specific plot creation
def create_sales_graph(ax, graph_type, sales_with_seasonality, future_sales_noisy, X, future_X, months):
    """Create the appropriate plot based on the selected graph type."""
    if graph_type == 'bar':
        ax.bar(range(1, len(X) + 1), sales_with_seasonality, label='Actual Sales (with seasonality)', color='blue')
        ax.bar(range(len(X) + 1, len(X) + months + 1), future_sales_noisy, label=f'{months}-Month Projection', color='red')
        ax.set(title="Sales and Future Projections", xlabel="Month", ylabel="Sales")
    elif graph_type == 'hist':
        ax.hist(sales_with_seasonality, bins=10, color='blue', alpha=0.7, label='Sales Distribution')
        ax.set(title="Sales and Future Projections", xlabel="Sales", ylabel="Month")
    elif graph_type == 'heatmap':
        heatmap_data = np.append(sales_with_seasonality, future_sales_noisy).reshape(-1, 1)
        sns.heatmap(heatmap_data, annot=True, cmap='Blues', ax=ax)
        ax.set_xlabel('Sales Values')
        ax.set(title="Sales and Future Projections", xlabel="Sales", ylabel="Month")
    elif graph_type == 'line':
        ax.plot(X, sales_with_seasonality, label='Actual Sales (with seasonality)', marker='o')
        ax.plot(future_X, future_sales_noisy, label=f'{months}-Month Projection', linestyle='--', marker='x', color='red')
        ax.set(title="Sales and Future Projections", xlabel="Month", ylabel="Sales")
    elif graph_type == 'scatter':
        ax.scatter(X, sales_with_seasonality, label='Actual Sales (with seasonality)', color='blue')
        ax.scatter(future_X, future_sales_noisy, label=f'{months}-Month Projection', color='red')
        ax.set(title="Sales and Future Projections", xlabel="Month", ylabel="Sales")

    ax.legend()


# View to download the generated image
def download_image(request):
    """Serve the generated sales projection image as a download."""
    file_path = 'path_to_your_generated_image.png'  # Replace with the actual path
    file_format = 'image/png'  # Adjust based on the user's selection (png or jpg)

    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type=file_format)
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
            return response
    else:
        return HttpResponse("File not found.", status=404)

# Function to generate and save the sales projection graph as an image file
def generate_sales_projection(data, file_format='png'):
    """Generate the sales projection plot and save it to a file."""
    # Create the plot
    fig, ax = plt.subplots()
    # Plot data (assuming `data` has the necessary information)
    # Your plotting code here...

    # Save the plot to the MEDIA folder for easy access
    file_path = os.path.join(settings.MEDIA_ROOT, f'sales_projection.{file_format}')
    plt.savefig(file_path, format=file_format)

    return file_path
