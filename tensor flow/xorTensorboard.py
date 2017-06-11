import tensorflow as tf
import numpy as np

CHECK_POINT_DIR = TB_SUMMARY_DIR = './logs/xor_logs'

x_data = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=np.float32)
y_data = np.array([[0], [1], [1], [0]], dtype=np.float32)

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

# Hypothesis
#W = tf.Variable(tf.random_normal([2,1]), name = 'weight') # in = 2 , out = 1
#b = tf.Variable(tf.random_normal([1]), name = 'bias') # out =1 
#h = tf.sigmoid(tf.matmul(X, W) + b)

# layer
with tf.name_scope("layer1") as scope:
	W1 = tf.Variable(tf.random_normal([2,10]), name = 'weight1') # in = 2 , out = 10
	b1 = tf.Variable(tf.random_normal([10]), name = 'bias1') # out =10 
	layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

	W1_hist = tf.summary.histogram("weights1", W1)
	b1_hist = tf.summary.histogram("biases1", b1)
	layer1_hist = tf.summary.histogram("layer1", layer1)

with tf.name_scope("layer2") as scope:
	W2 = tf.Variable(tf.random_normal([10,10]), name = 'weight2') # in = 10 , out = 10
	b2 = tf.Variable(tf.random_normal([10]), name = 'bias2') # out =10 
	layer2  = tf.sigmoid(tf.matmul(layer1, W2) + b2)

	W2_hist = tf.summary.histogram("weights2", W2)
	b2_hist = tf.summary.histogram("biases2", b2)
	layer2_hist = tf.summary.histogram("layer2", layer2)

with tf.name_scope("layer3") as scope:
	W3 = tf.Variable(tf.random_normal([10,10]), name = 'weight3') # in = 10 , out = 10
	b3 = tf.Variable(tf.random_normal([10]), name = 'bias3') # out =10 
	layer3   = tf.sigmoid(tf.matmul(layer2, W3) + b3)

	W3_hist = tf.summary.histogram("weights3", W3)
	b3_hist = tf.summary.histogram("biases3", b3)
	layer3_hist = tf.summary.histogram("layer3", layer3)

with tf.name_scope("layer4") as scope:
	W4 = tf.Variable(tf.random_normal([10,1]), name = 'weight4') # in = 10 , out = 1
	b4 = tf.Variable(tf.random_normal([1]), name = 'bias4') # out =1 
	h  = tf.sigmoid(tf.matmul(layer3, W4) + b4)

	W4_hist = tf.summary.histogram("weights4", W4)
	b4_hist = tf.summary.histogram("biases4", b4)
	layer4_hist = tf.summary.histogram("layer4", h)

# Simplified cost/loss function
cost = -tf.reduce_mean(Y * tf.log(h) + (1 - Y) * tf.log(1 - h))

# Minimize
#optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1)
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# Accuracy computation
# if hypothesis>0.5  True(1) else False(0)
predicted = tf.cast(h > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

# Summary
summary = tf.summary.merge_all()

with tf.Session() as sess:
	sess.run(tf.global_variables_initializer())

	# write
	writer = tf.summary.FileWriter("./logs/xor_logs")
	writer.add_graph(sess.graph)
	global_step = 0
	for step in range(10001):
		 sess.run(train, feed_dict={X: x_data, Y: y_data})
		 if step % 100 == 0:
		 	print(step, sess.run(cost, feed_dict={X:x_data, Y:y_data}), sess.run([W1, W2, W3, W4]))


	h, c, a = sess.run([h, predicted, accuracy], feed_dict={X: x_data, Y:y_data})
	s, _ = sess.run([summary, train], feed_dict={X: x_data, Y: y_data})
	writer.add_summary(s, global_step=global_step)
	global_step += 1
	print("\nHypothesis: ", h, "\nCorrect: ", c, "\nAccuracy: ", a)


