--query 3
SELECT country
FROM (	
	SELECT user_id, AVG(usd_amount) as spent
	FROM transactions
	GROUP BY user_id) join users
where spent<500 and users.id=user_id