import numpy as np
import matplotlib.pyplot as plt

# Generate random data
data = np.random.randn(100)

# Create histogram
fig, ax = plt.subplots()
ax.hist(data, bins=10, color='skyblue', edgecolor='black')

# Add title and labels
ax.set(title="Histogram of Random Data", xlabel="Values", ylabel="Frequency")

# Display the plot
plt.show()
