WITH non_zero_counts AS (
  SELECT
    'alchemy' AS provider,
    COUNT(alchemy) AS non_zero_total,
    COUNT(*) - COUNT(DISTINCT alchemy) AS duplicates
  FROM
    rounds
  WHERE
    alchemy != 0
  UNION ALL
  SELECT
    'ankr' AS provider,
    COUNT(ankr) AS non_zero_total,
    COUNT(*) - COUNT(DISTINCT ankr) AS duplicates
  FROM
    rounds
  WHERE
    ankr != 0
  UNION ALL
  SELECT
    'chainstack' AS provider,
    COUNT(chainstack) AS non_zero_total,
    COUNT(*) - COUNT(DISTINCT chainstack) AS duplicates
  FROM
    rounds
  WHERE
    chainstack != 0
  UNION ALL
  SELECT
    'pokt' AS provider,
    COUNT(pokt) AS non_zero_total,
    COUNT(*) - COUNT(DISTINCT pokt) AS duplicates
  FROM
    rounds
  WHERE
    pokt != 0
  UNION ALL
  SELECT
    'quicknode' AS provider,
    COUNT(quicknode) AS non_zero_total,
    COUNT(*) - COUNT(DISTINCT quicknode) AS duplicates
  FROM
    rounds
  WHERE
    quicknode != 0
)
SELECT
  provider,
  ROUND(100.0 * duplicates / non_zero_total, 2) AS duplicates_percentage
FROM
  non_zero_counts
 order by duplicates_percentage;