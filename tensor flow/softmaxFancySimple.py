import tensorflow as tf
import numpy as np					

xy = np.loadtxt('data_zoo.csv', delimiter=',', dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]

nb_classes = 7 # 0~6

X = tf.placeholder(tf.float32, [None, 16])
# 0~6, shape=(?, 1)
Y=tf.placeholder(tf.int32, [None, 1])
# ont hot shape = (?, 1, 7)
Y_ont_hot = tf.one_hot(Y, nb_classes) 
# shape=(?,7)
#reshape ? if the input rank N, the output rank N+1
Y_ont_hot = tf.reshape(Y_ont_hot, [-1, nb_classes])

# input = 16, output = nb_classes
W = tf.Variable(tf.random_normal([16, nb_classes]), name = 'weight')
b = tf.Variable(tf.random_normal([nb_classes]), name = 'bias')

logits = tf.matmul(X,W) +b
h = tf.nn.softmax(logits)
cost_i = tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=Y_ont_hot)
cost = tf.reduce_mean(cost_i)

# traint
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# Represent accuracy by 0~6
prediction = tf.argmax(h, 1)
correct_prediction = tf.equal(prediction, tf.argmax(Y_ont_hot, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

with tf.Session() as sess:
	sess.run(tf.global_variables_initializer())
	for step in range(2001):
		sess.run(optimizer, feed_dict={X:x_data, Y:y_data})
		if step % 20 == 0:
			loss, acc = sess.run([cost, accuracy], feed_dict = {X:x_data, Y:y_data})
			print("Step: {:5}\tLoss: {:3f}\tAcc:{:.2%}".format(step, loss, acc))

	pred = sess.run(prediction, feed_dict={X:x_data})
	# flatthen = [[1],[0]] -> [1, 0]
	for p, y in zip(pred, y_data.flatten()):
		print("[{}] Prediction:{} True Y: {}".format(p==int(y), p, int(y)))
