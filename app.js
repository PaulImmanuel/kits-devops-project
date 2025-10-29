// File: app.js
const http = require('http');
const port = 8080;

// --- 1. CSS & STYLING (with animations) ---
// We embed all CSS here
const mainCSS = `
    body { 
        font-family: 'Arial', sans-serif; 
        margin: 0; 
        padding: 0; 
        background-color: #f4f4f4; 
    }
    .nav {
        background-color: #004a99;
        padding: 15px 0;
        text-align: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .nav a {
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1em;
        transition: background-color 0.3s ease;
    }
    .nav a:hover {
        background-color: #005abf;
        border-radius: 5px;
    }
    .container { 
        max-width: 1200px; 
        margin: 20px auto; 
        padding: 20px; 
        background-color: white; 
        border-radius: 8px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        
        /* --- Animation --- */
        animation: fadeIn 0.8s ease-in-out;
    }
    .listing { 
        border: 1px solid #ddd; 
        margin-bottom: 20px; 
        padding: 15px; 
        border-radius: 5px; 
    }
    .listing img { 
        max-width: 100%; 
        height: auto; 
        border-radius: 5px; 
    }
    .listing h3 { color: #004a99; }
    .footer { 
        text-align: center; 
        padding: 20px; 
        margin-top: 20px; 
        color: #777; 
    }
    
    /* --- Keyframe Animation --- */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// --- 2. HTML CONTENT FOR EACH PAGE ---

const homePageContent = `
    <h2>Welcome to Dream Homes</h2>
    <p>Your partner in finding the perfect home. We offer a wide range of properties, from downtown condos to suburban family homes.</p>
    <p>Use the navigation above to explore our listings or learn more about us.</p>
    <div class="listing">
        <img src="https://via.placeholder.com/800x400.png?text=Welcome+Home" alt="Welcome">
    </div>
`;

const listingsPageContent = `
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
`;

const aboutPageContent = `
    <h2>About Us</h2>
    <p>Dream Homes Real Estate has been a leader in the market for over 15 years. Our mission is to provide unparalleled service, expert advice, and a seamless home-buying experience.</p>
    <h3>Our Team</h3>
    <p>Our team of dedicated agents is ready to help you 24/7. We are passionate about real estate and about finding you the home of your dreams.</p>
    <p>This entire application was deployed automatically using a DevOps CI/CD pipeline!</p>
`;

const notFoundPageContent = `
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist. Please use the navigation above to find your way back.</p>
`;

// --- 3. HTML TEMPLATE FUNCTION ---
// This function builds the final page by wrapping the content in a template
function renderPage(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} | Dream Homes</title>
        <style>${mainCSS}</style>
    </head>
    <body>

        <div class="nav">
            <a href="/">Home</a>
            <a href="/listings">Listings</a>
            <a href="/about">About</a>
        </div>

        <div class="container">
            ${content}
        </div>

        <div class="footer">
            <p>&copy; 2025 Dream Homes Real Estate. Pipeline by Paul.</p>
        </div>

    </body>
    </html>
  `;
}

// --- 4. THE SERVER (ROUTER) ---
const server = http.createServer((req, res) => {
  let pageTitle = "";
  let pageContent = "";
  let statusCode = 200;

  // This is the router. It checks the URL and serves the correct content.
  switch (req.url) {
    case '/':
      pageTitle = "Home";
      pageContent = homePageContent;
      break;
    case '/listings':
      pageTitle = "Listings";
      pageContent = listingsPageContent;
      break;
    case '/about':
      pageTitle = "About Us";
      pageContent = aboutPageContent;
      break;
    default:
      // Handle 404 Not Found
      pageTitle = "404 Not Found";
      pageContent = notFoundPageContent;
      statusCode = 404;
      break;
  }

  // Send the final HTML page
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/html');
  res.end(renderPage(pageTitle, pageContent));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/ and handling routes`);
});