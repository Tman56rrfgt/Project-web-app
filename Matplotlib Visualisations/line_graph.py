import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Take 10 values from the user (e.g., student's marks)
marks = []
print("Enter 10 marks:")
for i in range(10):
    value = float(input(f"Mark {i+1}: "))
    marks.append(value)

# Convert marks list to a numpy array
data = np.array(marks)

# Calculate mode, median, mean, and range
mode = stats.mode(data, keepdims=False).mode
median = np.median(data)
mean = np.mean(data)
range_val = np.ptp(data)

# Create the line plot
fig, ax = plt.subplots()
ax.plot(data, marker='o', label="Marks", color='blue')

# Plot mode, median, mean, and range
ax.axhline(mode, color='green', linestyle='--', label=f"Mode: {mode:.2f}")
ax.axhline(median, color='orange', linestyle='--', label=f"Median: {median:.2f}")
ax.axhline(mean, color='yellow', linestyle='--', label=f"Mean: {mean:.2f}")
ax.axhline(data.min(), color='red', linestyle='--', label=f"Min: {data.min():.2f}")
ax.axhline(data.max(), color='purple', linestyle='--', label=f"Max: {data.max():.2f}")

# Add title, legend, and labels
ax.set(title="Marks Line Graph with Mode, Median, Mean, and Range", xlabel="Entries", ylabel="Marks")
ax.legend()

# Display the plot
plt.show()
