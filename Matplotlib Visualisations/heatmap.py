import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Generate random data (e.g., student's scores in subjects)
data = np.random.randint(50, 100, size=(5, 5))

# Create heatmap using Seaborn
fig, ax = plt.subplots()
sns.heatmap(data, annot=True, cmap="YlGnBu", ax=ax)

# Add title and labels
# ax.set(title="Heatmap of Student Scores", xlabel="Subjects", ylabel="Students")
plt.title('Heatmap of Student Scores')
plt.xlabel('Subjects')
plt.ylabel('Students')


# Display the plot
plt.show()
