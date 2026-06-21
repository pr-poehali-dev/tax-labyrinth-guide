CREATE TABLE IF NOT EXISTS t_p47669459_tax_labyrinth_guide.questions (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);