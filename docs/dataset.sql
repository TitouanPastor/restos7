-- Insert data into Country table
INSERT INTO Country (name) VALUES 
('USA'),
('Canada'),
('France');

-- Insert data into Permission table
INSERT INTO Permission (name) VALUES 
('Admin'),
('Blogger'),
('User'),
('Guest');

-- Insert data into Photo table
INSERT INTO Photo (url, alt) VALUES 
('http://example.com/photo1.jpg', 'Photo 1'),
('http://example.com/photo2.jpg', 'Photo 2'),
('http://example.com/photo3.jpg', 'Photo 3');

-- Insert data into Person table
INSERT INTO Person (name, firstname, email, password, Id_Photo) VALUES 
('Doe', 'John', 'john.doe@example.com', 'password123', 1),
('Smith', 'Jane', 'jane.smith@example.com', 'password456', 2),
('Brown', 'Charlie', 'charlie.brown@example.com', 'password789', 3);

-- Insert data into Restaurant table
INSERT INTO Restaurant (name, postal_code, city, address, description, website, Id_Country) VALUES 
('Restaurant A', '12345', 'New York', '123 Main St', 'A great place to eat', 'http://restaurant-a.com', 1),
('Restaurant B', '54321', 'Toronto', '456 Elm St', 'Delicious food', 'http://restaurant-b.com', 2),
('Restaurant C', '67890', 'Paris', '789 Oak St', 'Fine dining', 'http://restaurant-c.com', 3);

-- Insert data into Post table
INSERT INTO Post (comment, upvote, downvote, Id_Restaurant, Id_Person) VALUES 
('Great food!', 10, 2, 1, 1),
('Not bad', 5, 1, 2, 2),
('Excellent service', 8, 0, 3, 3);

-- Insert data into Note table
INSERT INTO Note (Id_Person, Id_Restaurant, score, comment) VALUES 
(1, 1, '5', 'Amazing!'),
(2, 2, '4', 'Pretty good'),
(3, 3, '5', 'Outstanding');

-- Insert data into Concern table
INSERT INTO Concern (Id_Person, Id_Permission) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Insert data into Have table
INSERT INTO Have (Id_Restaurant, Id_Photo) VALUES 
(1, 1),
(2, 2),
(3, 3);