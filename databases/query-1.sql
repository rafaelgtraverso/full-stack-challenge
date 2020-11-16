--Query 1
SELECT email
FROM users,(
	SELECT user_id,SUM(usd_amount) as spent
	FROM transactions
	GROUP BY user_id
	ORDER BY spent DESC
	LIMIT 3) AS T
WHERE users.id=T.user_id
