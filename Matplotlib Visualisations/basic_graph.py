import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

x = [0,1,2,3,4]
y = [0,2,4,6,8]

plt.plot(x, y, label='2x', color='purple', linewidth='1', linestyle='--', marker='.', markersize='5')

plt.title('Basic graph', fontdict={'fontname': 'Times New Roman', 'fontsize': 14})
plt.xlabel('X')
plt.ylabel('Y')

plt.xticks([0,1,2,3,4])
plt.yticks([0,2,4,6,8])

plt.legend()

plt.show()