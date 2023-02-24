SELECT
  provider,
  COUNT(*) AS wins
FROM
  (
    SELECT
      round,
      timestamp,
      'Alchemy' AS provider,
      alchemy AS slot,
      winners
    FROM
      rounds
    UNION ALL
    SELECT
      round,
      timestamp,
      'Ankr' AS provider,
      ankr AS slot,
      winners
    FROM
      rounds
    UNION ALL
    SELECT
      round,
      timestamp,
      'Chainstack' AS provider,
      chainstack AS slot,
      winners
    FROM
      rounds
    UNION ALL
    SELECT
      round,
      timestamp,
      'Pokt' AS provider,
      pokt AS slot,
      winners
    FROM
      rounds
    UNION ALL
    SELECT
      round,
      timestamp,
      'QuickNode' AS provider,
      quicknode AS slot,
      winners
    FROM
      rounds
  ) AS providers
WHERE
  winners LIKE CONCAT('%', provider, '%')
GROUP BY
  provider;
