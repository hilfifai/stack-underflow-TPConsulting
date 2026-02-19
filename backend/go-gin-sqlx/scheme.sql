-- StackUnderflow Database Schema
-- Q&A Platform like Stack Overflow

-- Users table
CREATE TABLE IF NOT EXISTS su_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS su_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
    user_id UUID NOT NULL REFERENCES su_users(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE IF NOT EXISTS su_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES su_questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES su_users(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_su_questions_user_id ON su_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_su_questions_status ON su_questions(status);
CREATE INDEX IF NOT EXISTS idx_su_questions_created_at ON su_questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_su_questions_title ON su_questions USING gin(to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_su_comments_question_id ON su_comments(question_id);
CREATE INDEX IF NOT EXISTS idx_su_comments_user_id ON su_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_su_comments_created_at ON su_comments(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_su_users_updated_at BEFORE UPDATE ON su_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_su_questions_updated_at BEFORE UPDATE ON su_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_su_comments_updated_at BEFORE UPDATE ON su_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO su_users (id, username, password) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'dev_master', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.uPuxQJ2B5p5F5F5F5F'),
    ('550e8400-e29b-41d4-a716-446655440002', 'css_ninja', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.uPuxQJ2B5p5F5F5F5F'),
    ('550e8400-e29b-41d4-a716-446655440003', 'js_learner', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.uPuxQJ2B5p5F5F5F5F')
ON CONFLICT (username) DO NOTHING;

-- Insert sample questions
INSERT INTO su_questions (id, title, description, status, user_id, username, created_at) VALUES
    ('660e8400-e29b-41d4-a716-446655440001', 'How do I center a div in CSS?', 
     'I''ve tried using margin: auto but it''s not working. What''s the best way to center a div both horizontally and vertically?',
     'answered', '550e8400-e29b-41d4-a716-446655440001', 'dev_master',
     NOW() - INTERVAL '2 days'),
    ('660e8400-e29b-41d4-a716-446655440002', 'What''s the difference between let and const in JavaScript?',
     'I''m new to JavaScript and I''m confused about when to use let vs const. Can someone explain the difference?',
     'open', '550e8400-e29b-41d4-a716-446655440002', 'js_learner',
     NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO su_comments (id, question_id, user_id, username, content, created_at) VALUES
    ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001',
     '550e8400-e29b-41d4-a716-446655440002', 'css_ninja',
     'You can use flexbox: display: flex; justify-content: center; align-items: center;',
     NOW() - INTERVAL '2 days')
ON CONFLICT DO NOTHING;
