// File: app.js
const http = require('http');
const port = 8080;

// Your new HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dream Homes Real Estate </title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .header { background-color: #004a99; color: white; padding: 20px; text-align: center; }
        .container { max-width: 1200px; margin: 20px auto; padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .listing { border: 1px solid #ddd; margin-bottom: 20px; padding: 15px; border-radius: 5px; }
        .listing img { max-width: 100%; height: auto; border-radius: 5px; }
        .listing h3 { color: #004a99; }
        .footer { text-align: center; padding: 20px; margin-top: 20px; color: #777; }
    </style>
</head>
<body>

    <div class="header">
        <h1>Dream Homes Real Estate</h1>
        <p>Your partner in finding the perfect home.</p>
    </div>

    <div class="container">
        <h2>Featured Listings</h2>

        <div class="listing">
            <img src="https://via.placeholder.com/800x400.png?text=Modern+Suburban+House" alt="Listing 1">
            <h3>Beautiful 4-Bedroom Suburban Home</h3>
            <p><strong>Price:</strong> $450,000</p>
            <p>A lovely home in a quiet neighborhood, perfect for families. Includes a large backyard and a 2-car garage.</p>
        </div>

        <div class="listing">
            <img src="https://via.placeholder.com/800x400.png?text=Downtown+Luxury+Condo" alt="Listing 2">
            <h3>Luxury Downtown Condo</h3>
            <p><strong>Price:</strong> $720,000</p>
            <p>Stunning views from the 20th floor. 2 bedrooms, 2 baths, and state-of-the-art amenities.</p>
        </div>
        
        <p>This application was deployed automatically using a DevOps CI/CD pipeline!</p>
    </div>

    <div class="footer">
        <p>&copy; 2025 Dream Homes Real Estate. Pipeline by Paul.</p>
    </div>

</body>
</html>
`;

// The server
const server = http.createServer((req, res) => {
  // 1. Set the correct header
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  // 2. Send the HTML content
  res.end(htmlContent);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});