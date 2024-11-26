import React, { useState, useEffect, FC } from 'react';

interface Market {
  id: number;
  description: string;
  deadline: string;
}

const MarketList: FC = () => {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      const mockMarkets: Market[] = [
        { id: 1, description: "Will $DOGE reach $0.1 by Dec 31?", deadline: "2024-12-31" },
        { id: 2, description: "Will $SHIBA double in value by next week?", deadline: "2024-11-30" },
      ];
      setMarkets(mockMarkets);
    };
    fetchMarkets();
  }, []);

  return (
    <div>
      <h2>Active Prediction Markets</h2>
      <ul>
        {markets.map((market) => (
          <li key={market.id}>
            {market.description} (Deadline: {market.deadline})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketList;
