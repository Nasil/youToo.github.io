import tensorflow as tf

from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets("MNIST_data/", one_hot = True)

picxel_size = 784
nb_classes = 10 # 28 X 28 picxel
learning_rate = 0.001

X = tf.placeholder(tf.float32, [None, picxel_size])
Y=tf.placeholder(tf.float32, [None, nb_classes])


# neural network
W1 = tf.Variable(tf.random_normal([picxel_size, 256]), name = 'weight1')
b1 = tf.Variable(tf.random_normal([256]), name = 'bias1')
L1 = tf.nn.relu(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([256, 256]), name = 'weight2')
b2 = tf.Variable(tf.random_normal([256]), name = 'bias2')
L2 = tf.nn.relu(tf.matmul(L1, W2) + b2)

W3 = tf.Variable(tf.random_normal([256, nb_classes]), name = 'weight3')
b3 = tf.Variable(tf.random_normal([nb_classes]), name = 'bias3')
h = tf.matmul(L2, W3) + b3

# defile cost / loss & optimizer
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=h, labels=Y))
optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate).minimize(cost)

is_correct = tf.equal(tf.arg_max(h, 1), tf.arg_max(Y,1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

# Training set & Test Set
# epochs : one forward pass and one backward pass of All the training examples 
# If you have 100 training examples, and batch size is 500, 
# then it will take 2 iterations to complete 1 epoch. 
training_epochs = 15
batch_size = 100

with tf.Session() as sess:
	sess.run(tf.global_variables_initializer())
	for epoch in range(training_epochs):
		avg_cost = 0
		total_batch = int(mnist.train.num_examples / batch_size)

		# batch size (1~100/101~200/201~300/ ....) 	
		for i in range(total_batch):
			batch_xs, batch_ys = mnist.train.next_batch(batch_size)
			c, _ = sess.run([cost, optimizer], feed_dict={X:batch_xs, Y:batch_ys})
			avg_cost += c / total_batch

			print ('Epoch:', '%04d' % (epoch + 1), 'cost =', '{:.9f}' . format(avg_cost))

	# Test data
	print ("Accuracy:", accuracy.eval(session=sess, feed_dict={X:mnist.test.images, Y:mnist.test.labels}))

## Relu -> ('Accuracy:', 0.94630003)
## Softmax -> ('Accuracy:', 0.889)




