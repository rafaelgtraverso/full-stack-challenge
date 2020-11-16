--query 2
SELECT COUNT(*)
FROM(	
	SELECT user_id, SUM(usd_amount) as spent
	FROM transactions
	GROUP BY user_id)
where spent>1000 and spent<2000
