SELECT * FROM rounds ORDER BY id;

SELECT 
  provider, 
  COUNT(*) AS timeouts 
FROM (
  SELECT 
    id, 
    timestamp, 
    'Alchemy' AS provider, 
    alchemy AS slot, 
    winners 
  FROM rounds
  UNION ALL 
  SELECT 
    id, 
    timestamp, 
    'Ankr' AS provider, 
    ankr AS slot, 
    winners 
  FROM rounds
  UNION ALL 
  SELECT 
    id, 
    timestamp, 
    'Chainstack' AS provider, 
    chainstack AS slot, 
    winners 
  FROM rounds
  UNION ALL 
  SELECT 
    id, 
    timestamp, 
    'Pokt' AS provider, 
    pokt AS slot, 
    winners 
  FROM rounds
  UNION ALL 
  SELECT 
    id, 
    timestamp, 
    'QuickNode' AS provider, 
    quicknode AS slot, 
    winners 
  FROM rounds
) AS providers 
WHERE slot = 0 
GROUP BY provider
order by timeouts;