import React, { useState, FC, FormEvent } from 'react';

const CreateMarket: FC = () => {
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Creating market:', { description, deadline });
    // Add Solana program interaction logic here
  };

  return (
    <div>
      <h2>Create a Prediction Market</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Market description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Create Market</button>
      </form>
    </div>
  );
};

export default CreateMarket;
