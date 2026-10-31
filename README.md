# CityRide — Self-Drive Car Rental Website

A responsive single-page car rental enquiry website built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Extract the ZIP.
2. Open the `cityride-rental-website` folder in VS Code.
3. Open `index.html` with Live Server (or open it directly in a browser).

## Important: configure before publishing
Open `script.js` and edit the `CONFIG` object near the top:
- `businessName`
- `phoneDisplay`
- `phone` (WhatsApp number with country code, digits only)
- `email`
- `address`
- social links
- rental policies

Also update the `CARS` array with the business's real vehicles, images, prices, specifications and deposits. Replace all sample testimonials in `REVIEWS` with verified customer reviews or remove that section.

The HTML currently uses a demo brand name (CityRide), placeholder phone/email details and illustrative vehicle rates. These are not real business details. Vehicle availability is never guaranteed by the frontend.

## Included
- Responsive navigation and mobile menu
- Hero section and booking search panel
- Car category filters and price/popularity sorting
- Vehicle detail modal
- Daily, weekly and monthly package cards
- How-it-works, benefits and rental requirements sections
- Sample testimonial carousel
- FAQ accordion
- Enquiry form that builds a WhatsApp message
- Click-to-call and floating WhatsApp actions
- Date validation, scroll-to-top and responsive layouts

## Notes
- WhatsApp enquiry opens a pre-filled message. It does not reserve a vehicle or confirm availability.
- Fonts, Font Awesome icons and car photography load from external CDNs/URLs, so an internet connection is needed for those assets.
- This is a frontend-only website. It does not include a booking database, payment gateway, admin dashboard or automatic availability system.
