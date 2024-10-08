import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate random data points
data = np.random.randn(100)

# Calculate mode, median, and range
mode = stats.mode(data, keepdims=False).mode
median = np.median(data)
range_val = np.ptp(data)

# Create bar plot for mode, median, and range
categories = ['Mode', 'Median', 'Range']
values = [mode, median, range_val]

fig, ax = plt.subplots()
ax.bar(categories, values, color=['green', 'orange', 'blue'])

# Add labels
ax.set(title="Bar Plot for Mode, Median, and Range")
plt.show()
