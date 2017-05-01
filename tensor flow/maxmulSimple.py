import tensorflow as tf
import numpy as np

xy = np.loadtxt('data_test_score.csv', delimiter =',', dtype=np.float32)

# nums, nums[:]
# nums[2,4]
# nums[:, 2] // 2 row
# nums[2, :] // 2 col
# nums[-1], nums[-1, ...] // last col

# All, not in last row
x_data = xy[:,0:-1]
# All, last row
y_data = xy[:,[-1]] 

X = tf.placeholder(tf.float32, shape=(None, 3))
Y = tf.placeholder(tf.float32, shape=(None, 1))

W = tf.Variable(tf.random_normal([3,1]), name = 'weight') 
b = tf.Variable(tf.random_normal([1]), name = 'bias')

# Hypothesis
h = tf.matmul(X, W) + b

# Simplified cost/loss function
cost = tf.reduce_mean(tf.square(h - Y))

# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

for step in range(2001):
	cost_val, h_val, _ = sess.run([cost, h, train],
		feed_dict = {X:x_data, Y:y_data})
	if step % 20 == 0:
		print(step, "Cost :", cost_val, "\n Prediction: \n", h_val)

# Ask Result
print ("Your score will be ", sess.run(h, feed_dict={X:[[100,80,90]]}))
print ("Other score will be ", sess.run(h, feed_dict={X:[[70,80,90], [90,50,60]]}))
