USE fluentai;

INSERT INTO users (username, email, password_hash)
VALUES
  ('alice', 'alice@example.com', '$2b$10$abcdefghijklmnopqrstuv'), 
  ('bob', 'bob@example.com', '$2b$10$wxyzabcdefghijklmnopqrst');   


INSERT INTO topics (prompt) VALUES
  ('Describe your favorite hobby and why you enjoy it'),
  ('Talk about a memorable trip or vacation you took'),
  ('Explain what makes a good friend'),
  ('What are your goals for the next year?'),
  ('Talk about a challenge you overcame');

INSERT INTO speaking_sessions (user_id, topic_id, audio_url, transcript, score, duration_sec, wpm, filler_count)
VALUES
  (1, 1, 'uploads/alice1.wav', 'My favorite hobby is painting because...', 83, 60, 120, 2),
  (1, 2, 'uploads/alice2.wav', 'Last year I went to Spain and it was...', 89, 58, 118, 1),
  (1, 4, 'uploads/alice3.wav', 'This year, my goal is to improve...', 75, 62, 105, 5);

INSERT INTO speaking_sessions (user_id, topic_id, audio_url, transcript, score, duration_sec, wpm, filler_count)
VALUES
  (2, 2, 'uploads/bob1.wav', 'A memorable trip for me was to the mountains...', 78, 60, 110, 3),
  (2, 3, 'uploads/bob2.wav', 'A good friend is someone who...', 92, 56, 128, 0),
  (2, 5, 'uploads/bob3.wav', 'A challenge I overcame was learning English...', 68, 63, 90, 7);


INSERT INTO feedback (session_id, ai_feedback, human_feedback)
VALUES
  (1, 'Great fluency and vocabulary. Work on adding more detail.', NULL),
  (4, 'Good effort! Watch your pacing and try to pause naturally.', NULL),
  (5, 'Excellent clarity and minimal fillers! Keep it up.', NULL);