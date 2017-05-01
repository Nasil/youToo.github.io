import tensorflow as tf

filename_queue = tf.train.string_input_producer(
	['data_test_score.csv', 'data_test_score2.csv'], shuffle=True, name='filename_queue')

#1.Read File
reader = tf.TextLineReader()
key, value = reader.read(filename_queue)

#2.Decode Result
record_defaults = [[0.],[0.],[0.],[0.]]
xy = tf.decode_csv(value, record_defaults=record_defaults)

#3. 
train_x_batch, train_y_batch = \
	tf.train.batch([xy[0:-1], xy[-1:]], batch_size=10)

X = tf.placeholder(tf.float32, shape=[None, 3])
Y = tf.placeholder(tf.float32, shape=[None, 1])
W = tf.Variable(tf.random_normal([3,1]), name = 'weight')
b = tf.Variable(tf.random_normal([1]), name = 'bias')

h = tf.matmul(X, W) + b
cost = tf.reduce_mean(tf.square(h - Y))

optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

coord = tf.train.Coordinator()
threads = tf.train.start_queue_runners(sess=sess, coord=coord)

for step in range(2001):
	x_batch, y_batch = sess.run([train_x_batch, train_y_batch])
	cost_val, h_val, _ = sess.run(
		[cost, h, train],
		feed_dict={X:x_batch, Y:y_batch})
	if step % 20 == 0:
		print(step, "Cost :", cost_val, "Prediction : ", h_val)


coord.request_stop()
coord.join(threads)
