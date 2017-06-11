import tensorflow as tf
import numpy as np

x_data = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=np.float32)
y_data = np.array([[0], [1], [1], [0]], dtype=np.float32)

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

# Hypothesis
#W = tf.Variable(tf.random_normal([2,1]), name = 'weight') # in = 2 , out = 1
#b = tf.Variable(tf.random_normal([1]), name = 'bias') # out =1 
#h = tf.sigmoid(tf.matmul(X, W) + b)

# layer
W1 = tf.Variable(tf.random_normal([2,10]), name = 'weight1') # in = 2 , out = 10
b1 = tf.Variable(tf.random_normal([10]), name = 'bias1') # out =10 
layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([10,10]), name = 'weight2') # in = 10 , out = 10
b2 = tf.Variable(tf.random_normal([10]), name = 'bias2') # out =10 
layer2  = tf.sigmoid(tf.matmul(layer1, W2) + b2)

W3 = tf.Variable(tf.random_normal([10,10]), name = 'weight3') # in = 10 , out = 10
b3 = tf.Variable(tf.random_normal([10]), name = 'bias3') # out =10 
layer3   = tf.sigmoid(tf.matmul(layer2, W3) + b3)

W4 = tf.Variable(tf.random_normal([10,1]), name = 'weight4') # in = 10 , out = 1
b4 = tf.Variable(tf.random_normal([1]), name = 'bias4') # out =1 
h  = tf.sigmoid(tf.matmul(layer3, W4) + b4)

# Simplified cost/loss function
cost = -tf.reduce_mean(Y * tf.log(h) + (1 - Y) * tf.log(1 - h))

# Minimize
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# Accuracy computation
# if hypothesis>0.5  True(1) else False(0)
predicted = tf.cast(h > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))


with tf.Session() as sess:
	sess.run(tf.global_variables_initializer())
	for step in range(10001):
		 sess.run(train, feed_dict={X: x_data, Y: y_data})
		 if step % 100 == 0:
		 	print(step, sess.run(cost, feed_dict={X:x_data, Y:y_data}), sess.run([W1, W2, W3, W4]))

	h, c, a = sess.run([h, predicted, accuracy], feed_dict={X: x_data, Y:y_data})
	print("\nHypothesis: ", h, "\nCorrect: ", c, "\nAccuracy: ", a)




######### RESULT ##########

######### Layer 2 ######### 
#	('\nHypothesis: ', array([[ 0.00821132],
#       [ 0.99103385],
#       [ 0.49703497],
#       [ 0.50354868]], dtype=float32), '\nCorrect: ', array([[ 0.],
#       [ 1.],
#       [ 0.],
#       [ 1.]], dtype=float32), '\nAccuracy: ', 0.5)


######## Layer 4 ##########
#('\nHypothesis: ', array([[ 0.00141308],
#       [ 0.99907303],
#       [ 0.99867177],
#       [ 0.00158156]], dtype=float32), '\nCorrect: ', array([[ 0.],
#       [ 1.],
#       [ 1.],
#       [ 0.]], dtype=float32), '\nAccuracy: ', 1.0)
