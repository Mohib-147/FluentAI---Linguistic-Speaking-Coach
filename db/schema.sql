CREATE DATABASE IF NOT EXISTS fluentai;
USE fluentai;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT NOT NULL
);

CREATE TABLE speaking_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic_id INT NOT NULL,
    audio_url VARCHAR(255),
    transcript TEXT,
    score INT,
    duration_sec INT,
    wpm INT,
    filler_count INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);


CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    ai_feedback TEXT,
    human_feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES speaking_sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_id ON speaking_sessions(user_id);
CREATE INDEX idx_topic_id ON speaking_sessions(topic_id);
CREATE INDEX idx_session_id ON feedback(session_id);
