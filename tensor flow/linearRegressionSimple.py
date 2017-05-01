import tensorflow as tf 
# Linear Regression 
# H(x) = wx + b
x = tf.placeholder(tf.float32, shape=[None])
y = tf.placeholder(tf.float32, shape=[None])
b = tf.Variable(tf.random_normal([1]), name = 'bias')
w = tf.Variable(tf.random_normal([1]), name = 'weight')

h = w * x + b
cost = tf.reduce_mean(tf.square(h - y))

# find minimum cost 
optimizer = tf.train.GradientDescentOptimizer(learning_rate = 0.01)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.initialize_all_variables())

for step in range(2001):
	cost_val, w_val, b_val, _ = sess.run([cost, w, b, train],
			feed_dict = {x:[1,2,3,4,5], y:[2.1,3.1,4.1,5.1,6.1]}) 
	if step % 20 == 0:
		print(step, cost_val, w_val, b_val)

