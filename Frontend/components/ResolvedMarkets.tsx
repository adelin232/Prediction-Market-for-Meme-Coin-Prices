import React, { useState, useEffect, FC } from 'react';

interface ResolvedMarket {
  id: number;
  description: string;
  outcome: string;
}

const ResolvedMarkets: FC = () => {
  const [markets, setMarkets] = useState<ResolvedMarket[]>([]);

  useEffect(() => {
    const fetchResolvedMarkets = async () => {
      const mockResolvedMarkets: ResolvedMarket[] = [
        { id: 1, description: "Will $DOGE reach $0.1 by Dec 31?", outcome: "Yes" },
      ];
      setMarkets(mockResolvedMarkets);
    };
    fetchResolvedMarkets();
  }, []);

  return (
    <div>
      <h2>Resolved Markets</h2>
      <ul>
        {markets.map((market) => (
          <li key={market.id}>
            {market.description} - Outcome: {market.outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResolvedMarkets;
