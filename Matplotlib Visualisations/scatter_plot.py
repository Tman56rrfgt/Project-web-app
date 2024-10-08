import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate random data points
data = np.random.randn(100)

# Calculate mode, median, and range
mode = stats.mode(data, keepdims=False).mode
median = np.median(data)
range_val = np.ptp(data)

fig, ax = plt.subplots()
ax.scatter(data, np.zeros_like(data), color='blue', alpha=0.6)

# Plot mode, median, and range
ax.axvline(mode, color='green', linestyle='--', label=f"Mode: {mode:.2f}")
ax.axvline(median, color='orange', linestyle='--', label=f"Median: {median:.2f}")
ax.axvline(data.min(), color='red', linestyle='--', label=f"Min: {data.min():.2f}")
ax.axvline(data.max(), color='purple', linestyle='--', label=f"Max: {data.max():.2f}")

# Add labels
ax.legend()
ax.set(title="Scatter Plot with Mode, Median, and Range")
plt.show()
