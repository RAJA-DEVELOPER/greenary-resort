const fs = require('fs');

const extraCss = `
    .wide-intro { max-width: 980px; margin: 0 auto; text-align: center; }
    .wide-intro .section-desc { margin-left: auto; margin-right: auto; }
    .mini-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 2rem; }
    .mini-kpi { border: 1px solid rgba(212,168,83,0.16); background: rgba(250,248,245,0.035); border-radius: 6px; padding: 1.4rem; text-align: center; }
    .mini-kpi strong { display: block; font-family: var(--font-display); font-size: 2rem; color: var(--gold); line-height: 1; }
    .mini-kpi span { display: block; margin-top: 0.55rem; font-family: var(--font-ui); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(237,229,218,0.58); }
    .package-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
    .package-card { border: 1px solid rgba(212,168,83,0.16); background: rgba(250,248,245,0.035); border-radius: 6px; overflow: hidden; }
    .package-card img, .package-card video { width: 100%; height: 260px; object-fit: cover; }
    .package-body { padding: 1.5rem; }
    .package-meta { font-family: var(--font-ui); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.55rem; }
    .package-title { font-family: var(--font-display); font-size: 1.65rem; color: var(--ivory); margin-bottom: 0.65rem; }
    .detail-table { display: grid; border: 1px solid rgba(212,168,83,0.16); border-radius: 6px; overflow: hidden; }
    .detail-row { display: grid; grid-template-columns: 0.8fr 1.2fr; border-bottom: 1px solid rgba(212,168,83,0.1); }
    .detail-row:last-child { border-bottom: none; }
    .detail-row div { padding: 1.1rem 1.25rem; color: rgba(237,229,218,0.7); }
    .detail-row div:first-child { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); background: rgba(212,168,83,0.05); }
    .faq-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .faq-item { border: 1px solid rgba(212,168,83,0.14); border-radius: 6px; padding: 1.5rem; background: rgba(250,248,245,0.03); }
    .faq-item h3 { font-family: var(--font-display); color: var(--ivory); font-size: 1.35rem; margin-bottom: 0.6rem; }
    .image-band { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
    .image-band img { width: 100%; height: 240px; object-fit: cover; border-radius: 5px; border: 1px solid rgba(212,168,83,0.14); }
    .quote-panel { max-width: 980px; margin: 0 auto; text-align: center; border: 1px solid rgba(212,168,83,0.18); border-radius: 6px; padding: clamp(2rem, 5vw, 4rem); background: rgba(212,168,83,0.045); }
    .quote-panel p { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3.8rem); line-height: 1.05; color: var(--ivory); }
    .quote-panel span { display: block; margin-top: 1rem; font-family: var(--font-ui); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); }
`;

const responsiveCss = `
      .mini-kpis, .package-grid, .faq-grid, .image-band { grid-template-columns: 1fr; }
      .detail-row { grid-template-columns: 1fr; }
`;

const details = {
  'adventures.html': `
    <div id="details">
      <section class="section bg-coal">
        <div class="container wide-intro">
          <div class="section-label section-label-center">Adventure Desk</div>
          <h2 class="section-title fs-h2 text-center">Every route is guided, seasonal, and deliberately small.</h2>
          <p class="section-desc">Terravana adventures are not mass tours. Each trail, safari, and evening experience is planned around weather, wildlife movement, guest fitness, and the carrying capacity of the forest. You can build a gentle family stay, a serious photography expedition, or a packed four-day wilderness itinerary.</p>
          <div class="mini-kpis">
            <div class="mini-kpi"><strong>18</strong><span>Mapped Trails</span></div>
            <div class="mini-kpi"><strong>6</strong><span>Core Experiences</span></div>
            <div class="mini-kpi"><strong>10</strong><span>Guests Max</span></div>
            <div class="mini-kpi"><strong>4</strong><span>Seasons</span></div>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container package-grid">
          <a class="package-card" href="trekking.html"><img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80" alt="Guided trekking trail" loading="lazy"><div class="package-body"><div class="package-meta">Half day to full day</div><h3 class="package-title">Trekking Trails</h3><p class="feature-text">Ridge walks, summit mornings, valley loops, and shaded forest routes for every pace.</p></div></a>
          <a class="package-card" href="wildlife.html"><img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&q=80" alt="Wildlife safari sighting" loading="lazy"><div class="package-body"><div class="package-meta">Dawn and dusk</div><h3 class="package-title">Wildlife Safaris</h3><p class="feature-text">Ethical drives and walks with naturalists who read tracks, calls, wind, and silence.</p></div></a>
          <a class="package-card" href="waterfalls.html"><img src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&q=80" alt="Waterfall trail" loading="lazy"><div class="package-body"><div class="package-meta">Best after rain</div><h3 class="package-title">Waterfall Walks</h3><p class="feature-text">Mossy paths, misty viewpoints, cool pools, and monsoon drama without rushing.</p></div></a>
          <a class="package-card" href="campfire.html"><img src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=900&q=80" alt="Campfire night" loading="lazy"><div class="package-body"><div class="package-meta">Evenings</div><h3 class="package-title">Campfire Nights</h3><p class="feature-text">Local food, herb tea, stories, acoustic music, and stargazing after dinner.</p></div></a>
          <a class="package-card" href="seasonal.html"><img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80" alt="Seasonal forest" loading="lazy"><div class="package-body"><div class="package-meta">All year</div><h3 class="package-title">Seasonal Journeys</h3><p class="feature-text">Monsoon waterfalls, autumn wildlife, winter skies, and summer ridge trekking.</p></div></a>
          <a class="package-card" href="booking.html"><img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" alt="Custom itinerary planning" loading="lazy"><div class="package-body"><div class="package-meta">Custom plans</div><h3 class="package-title">Private Itineraries</h3><p class="feature-text">A guide-planned mix of lodge stay, trails, safaris, food, and downtime.</p></div></a>
        </div>
      </section>

      <section class="section bg-coal">
        <div class="container split-section">
          <div>
            <div class="section-label">How To Choose</div>
            <h2 class="section-title fs-h2">Pick by energy, not by trend.</h2>
            <p class="section-desc">Some guests want a sunrise climb. Some want a slow birding walk and a long lunch. Both are right. Our team matches you with terrain, guide style, and timings that suit your body and the season.</p>
            <ul class="quiet-list">
              <li>Easy: nature walks, waterfall viewpoints, campfire evenings.</li>
              <li>Moderate: ridge trails, birding loops, half-day safaris.</li>
              <li>Challenging: summit treks, full-day forest routes, photography hides.</li>
              <li>Family friendly: short guided walks, lodge activities, gentle evening programmes.</li>
            </ul>
          </div>
          <div class="detail-table">
            <div class="detail-row"><div>Best First Trip</div><div>Two nights with one trek, one safari, and one campfire dinner.</div></div>
            <div class="detail-row"><div>Best Wildlife Season</div><div>October to February for clearer visibility and active movement.</div></div>
            <div class="detail-row"><div>Best Waterfalls</div><div>June to September, with route changes during heavy rain windows.</div></div>
            <div class="detail-row"><div>Guide Ratio</div><div>One lead guide for every small group, with assistants on longer trails.</div></div>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container quote-panel">
          <p>"The best adventure is the one that lets the forest set the pace."</p>
          <span>Terravana Guide Team</span>
        </div>
      </section>
    </div>`,

  'campfire.html': `
    <div id="details">
      <section class="section bg-coal">
        <div class="container split-section">
          <video autoplay muted loop playsinline poster="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1000&q=80">
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
          </video>
          <div>
            <div class="section-label">Forest Evenings</div>
            <h2 class="section-title fs-h2">Slow nights, deep stories, warm food.</h2>
            <p class="section-desc">Our campfire nights are calm, hosted gatherings. Nothing is rushed. You arrive after sunset, settle into low seating, eat from a seasonal fire menu, and let the night gather around the circle.</p>
            <ul class="quiet-list">
              <li>Shared fire circles for lodge guests and private setups for celebrations.</li>
              <li>Wood-fired breads, smoked vegetables, herb teas, and seasonal sweets.</li>
              <li>Storytelling by local guides, acoustic music, and skywatching on clear nights.</li>
              <li>Optional guided night walk before the fire.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container package-grid">
          <div class="package-card"><img src="https://images.unsplash.com/photo-1478827387698-1527781a4887?w=900&q=80" alt="Classic campfire circle" loading="lazy"><div class="package-body"><div class="package-meta">Shared evening</div><h3 class="package-title">Classic Circle</h3><p class="feature-text">A relaxed campfire with local snacks, forest stories, and guide-led conversation.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" alt="Private celebration setup" loading="lazy"><div class="package-body"><div class="package-meta">Private setup</div><h3 class="package-title">Celebration Fire</h3><p class="feature-text">An intimate circle for birthdays, proposals, anniversaries, or family milestones.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&q=80" alt="Stargazing night" loading="lazy"><div class="package-body"><div class="package-meta">Clear skies</div><h3 class="package-title">Stars And Stories</h3><p class="feature-text">A skywatching evening with mythology, constellations, and warm drinks.</p></div></div>
        </div>
      </section>

      <section class="section bg-coal">
        <div class="container split-section">
          <div>
            <div class="section-label">Evening Flow</div>
            <h2 class="section-title fs-h2">What the night feels like.</h2>
            <div class="detail-table">
              <div class="detail-row"><div>6:30 PM</div><div>Gather at the lodge deck for tea and a short forest briefing.</div></div>
              <div class="detail-row"><div>7:00 PM</div><div>Optional slow night walk to listen for owls, frogs, and cicadas.</div></div>
              <div class="detail-row"><div>8:00 PM</div><div>Campfire dinner, local stories, and seasonal fire-cooked plates.</div></div>
              <div class="detail-row"><div>9:30 PM</div><div>Stargazing or quiet dessert before walking back to the cottages.</div></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=1000&q=80" alt="Guests around a warm campfire" loading="lazy">
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container faq-grid">
          <div class="faq-item"><h3>Is it suitable for children?</h3><p class="feature-text">Yes. We keep the early part family friendly and can arrange quieter seating for younger guests.</p></div>
          <div class="faq-item"><h3>What happens if it rains?</h3><p class="feature-text">The experience moves to a covered fire kitchen or lodge hearth depending on weather.</p></div>
          <div class="faq-item"><h3>Can food be customised?</h3><p class="feature-text">Yes. Tell us your dietary needs during booking and the kitchen will plan accordingly.</p></div>
          <div class="faq-item"><h3>Is the fire low impact?</h3><p class="feature-text">We use designated fire areas, controlled fuel, and strict cleanup protocols after every evening.</p></div>
        </div>
      </section>
    </div>`,

  'ecoresorts.html': `
    <div id="details">
      <section class="section bg-coal">
        <div class="container wide-intro">
          <div class="section-label section-label-center">Stay Wild</div>
          <h2 class="section-title fs-h2 text-center">Comfort that stays close to the land.</h2>
          <p class="section-desc">Terravana lodges are quiet, textured, and deliberately restrained. Expect warm light, natural ventilation, locally made furniture, filtered water, generous decks, and rooms that invite sleep after a day outside.</p>
          <div class="mini-kpis">
            <div class="mini-kpi"><strong>24</strong><span>Rooms</span></div>
            <div class="mini-kpi"><strong>3</strong><span>Lodge Types</span></div>
            <div class="mini-kpi"><strong>100%</strong><span>Refill Water</span></div>
            <div class="mini-kpi"><strong>0</strong><span>Plastic Bottles</span></div>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container package-grid">
          <div class="package-card"><img src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&q=80" alt="Canopy cottage exterior" loading="lazy"><div class="package-body"><div class="package-meta">Couples and solo guests</div><h3 class="package-title">Canopy Cottage</h3><p class="feature-text">Raised rooms with forest views, reading corners, rain showers, and quiet balcony mornings.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80" alt="Ridge villa interior" loading="lazy"><div class="package-body"><div class="package-meta">Families and long stays</div><h3 class="package-title">Ridge Villa</h3><p class="feature-text">Larger rooms, private deck dining, valley light, and easy access to sunrise trails.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80" alt="Forest camp setting" loading="lazy"><div class="package-body"><div class="package-meta">Groups and students</div><h3 class="package-title">Forest Camp</h3><p class="feature-text">Refined camp comfort for research groups, workshops, photography trips, and adventure teams.</p></div></div>
        </div>
      </section>

      <section class="section bg-coal">
        <div class="container split-section">
          <div>
            <div class="section-label">What Is Included</div>
            <h2 class="section-title fs-h2">Everything you need after the trail.</h2>
            <ul class="quiet-list">
              <li>Breakfast with seasonal fruit, local grain, fresh bread, and forest honey.</li>
              <li>Filtered drinking water, refill bottles, natural bath amenities, and tea station.</li>
              <li>Guide consultation on arrival to shape your route and pace.</li>
              <li>Evening housekeeping, warm lighting, insect screens, and quiet hours.</li>
              <li>Optional add-ons: private campfire, packed trail lunch, photography hide, and spa therapy.</li>
            </ul>
          </div>
          <div class="detail-table">
            <div class="detail-row"><div>Check-in</div><div>2:00 PM, with early arrival lounge subject to room readiness.</div></div>
            <div class="detail-row"><div>Check-out</div><div>11:00 AM, late checkout on request when possible.</div></div>
            <div class="detail-row"><div>Food</div><div>Local, seasonal, vegetarian friendly, and allergy-aware.</div></div>
            <div class="detail-row"><div>Connectivity</div><div>Wi-Fi in common spaces; rooms are designed for quiet disconnection.</div></div>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container image-band">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80" alt="Eco room detail" loading="lazy">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&q=80" alt="Forest cottage" loading="lazy">
          <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&q=80" alt="Warm lodge architecture" loading="lazy">
          <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80" alt="Valley view near lodge" loading="lazy">
        </div>
      </section>
    </div>`,

  'gallery.html': `
    <div id="details">
      <section class="section bg-coal">
        <div class="container wide-intro">
          <div class="section-label section-label-center">Field Notes In Frames</div>
          <h2 class="section-title fs-h2 text-center">Trails, lodges, birds, waterfalls, and nights by fire.</h2>
          <p class="section-desc">This gallery is arranged like a day at Terravana: morning light, moving trails, forest life, wet stone, lodge calm, and the glow that arrives after sunset.</p>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container">
          <div class="gallery-grid">
            <video controls playsinline poster="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80">
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
            </video>
            <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80" alt="Morning forest canopy" loading="lazy">
            <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&q=80" alt="Wild deer in forest light" loading="lazy">
            <img src="https://images.unsplash.com/photo-1511497584788-876760111969?w=900&q=80" alt="Great hornbill habitat in dense forest canopy" loading="lazy">
            <img src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900&q=80" alt="Waterfall in monsoon forest" loading="lazy">
            <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80" alt="Mountain trail viewpoint" loading="lazy">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80" alt="Eco lodge at golden hour" loading="lazy">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80" alt="Warm lodge interior" loading="lazy">
            <img src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=900&q=80" alt="Campfire evening" loading="lazy">
          </div>
        </div>
      </section>

      <section class="section bg-coal">
        <div class="container package-grid">
          <div class="package-card"><img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80" alt="Trek photography" loading="lazy"><div class="package-body"><div class="package-meta">Trail Frames</div><h3 class="package-title">Ridge And Valley</h3><p class="feature-text">Wide views, forest tracks, boots on red earth, and the quiet work of climbing.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80" alt="Forest photography" loading="lazy"><div class="package-body"><div class="package-meta">Forest Light</div><h3 class="package-title">Green Hours</h3><p class="feature-text">Mist, canopy shafts, fern edges, and the rich texture of old trees.</p></div></div>
          <div class="package-card"><img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&q=80" alt="Night sky photography" loading="lazy"><div class="package-body"><div class="package-meta">Night Frames</div><h3 class="package-title">Fire And Stars</h3><p class="feature-text">Warm circles after dark, clean skies, and the slow fade into lodge quiet.</p></div></div>
        </div>
      </section>
    </div>`,

  'contact.html': `
    <div id="details">
      <section class="section bg-coal">
        <div class="container contact-panel">
          <form class="contact-form" action="#" method="post">
            <input type="text" name="name" placeholder="Full name" aria-label="Full name" required>
            <input type="email" name="email" placeholder="Email address" aria-label="Email address" required>
            <select name="interest" aria-label="Interest">
              <option value="">What are you interested in?</option>
              <option>Eco resort stay</option>
              <option>Adventure package</option>
              <option>Group booking</option>
              <option>Custom itinerary</option>
              <option>Media or research visit</option>
            </select>
            <textarea name="message" placeholder="Tell us your preferred dates, group size, and dream experience" aria-label="Message"></textarea>
            <button class="btn btn-primary" type="submit">Submit Enquiry</button>
          </form>
          <div class="feature-card" style="min-height:auto;">
            <div class="feature-icon"><i class="fa-solid fa-location-dot"></i></div>
            <h3 class="feature-title">Terravana Guest Desk</h3>
            <p class="feature-text">Email: stay@terravana-wilds.example<br>Phone: +91 98765 43210<br>Hours: 8:00 AM to 8:00 PM IST</p>
            <ul class="quiet-list">
              <li>Booking guidance within 24 hours.</li>
              <li>Season and trail advice from the guide team.</li>
              <li>Group, student, and research stay support.</li>
              <li>Custom plans for families, photographers, and private celebrations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container package-grid">
          <div class="package-card"><div class="package-body"><div class="package-meta">Step 01</div><h3 class="package-title">Share Your Dates</h3><p class="feature-text">Tell us when you want to travel, your group size, fitness level, and preferred room style.</p></div></div>
          <div class="package-card"><div class="package-body"><div class="package-meta">Step 02</div><h3 class="package-title">Guide Consultation</h3><p class="feature-text">Our team checks season, weather, trail access, wildlife movement, and lodge availability.</p></div></div>
          <div class="package-card"><div class="package-body"><div class="package-meta">Step 03</div><h3 class="package-title">Confirm Your Plan</h3><p class="feature-text">You receive a suggested itinerary with stay, food, transport, and activity options.</p></div></div>
        </div>
      </section>

      <section class="section bg-coal">
        <div class="container split-section">
          <div>
            <div class="section-label">Useful Details</div>
            <h2 class="section-title fs-h2">Before you message us.</h2>
            <p class="section-desc">The more context you share, the better we can shape your stay. Dates, group age range, mobility needs, food restrictions, and whether you prefer comfort or adventure all help.</p>
            <div class="detail-table">
              <div class="detail-row"><div>Response Time</div><div>Most enquiries are answered within one working day.</div></div>
              <div class="detail-row"><div>Nearest Airport</div><div>Our reservations team shares transfer options after booking.</div></div>
              <div class="detail-row"><div>Group Size</div><div>We support solo guests, couples, families, student groups, and retreats.</div></div>
              <div class="detail-row"><div>Customisation</div><div>Food, trail difficulty, celebrations, and private guide time can be planned.</div></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1000&q=80" alt="Terravana valley contact desk view" loading="lazy">
        </div>
      </section>

      <section class="section bg-graphite">
        <div class="container faq-grid">
          <div class="faq-item"><h3>Can I book directly online?</h3><p class="feature-text">Yes, use the booking page for standard stays. Contact us for groups, special dates, or complex itineraries.</p></div>
          <div class="faq-item"><h3>Do you arrange transfers?</h3><p class="feature-text">Yes, transfers can be added after your stay dates are confirmed.</p></div>
          <div class="faq-item"><h3>Can children join treks?</h3><p class="feature-text">Yes. We suggest routes based on age, stamina, weather, and guide assessment.</p></div>
          <div class="faq-item"><h3>Do you host retreats?</h3><p class="feature-text">Yes. We support nature learning camps, photography retreats, wellness stays, and research groups.</p></div>
        </div>
      </section>
    </div>`,

  '404.html': `
      <main class="not-found">
        <div class="container">
          <div class="not-found-code">404</div>
          <div class="page-kicker">Trail Not Found</div>
          <h1 class="page-title" style="margin-inline:auto;">This path fades into the forest.</h1>
          <p class="page-subtitle" style="margin-inline:auto;">The page you are looking for is not available. Return to the lodge, choose a fresh route, or ask our team for help.</p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem;">
            <a href="index.html" class="btn btn-primary">Go Home</a>
            <a href="adventures.html" class="btn btn-ghost">Explore Adventures</a>
            <a href="contact.html" class="btn btn-ghost">Contact Team</a>
          </div>
        </div>
      </main>`
};

function enrichCss(html) {
  if (!html.includes('.wide-intro')) {
    html = html.replace('    @media (max-width: 900px) {', extraCss + '    @media (max-width: 900px) {');
  }
  if (!html.includes('.mini-kpis, .package-grid')) {
    html = html.replace('      .feature-grid, .split-section, .gallery-grid, .contact-panel { grid-template-columns: 1fr; }', '      .feature-grid, .split-section, .gallery-grid, .contact-panel { grid-template-columns: 1fr; }\n' + responsiveCss.trimEnd());
  }
  return html;
}

function replaceDetails(html, replacement) {
  const start = html.indexOf('    <div id="details">');
  const end = html.indexOf('\n  </main>', start);
  if (start === -1 || end === -1) return html;
  return html.slice(0, start) + replacement + html.slice(end);
}

for (const [file, replacement] of Object.entries(details)) {
  let html = fs.readFileSync(file, 'utf8');
  html = enrichCss(html);
  if (file === '404.html') {
    const start = html.indexOf('      <main class="not-found">');
    const end = html.indexOf('\n  <script src="script.js"></script>', start);
    if (start !== -1 && end !== -1) html = html.slice(0, start) + replacement + html.slice(end);
  } else {
    html = replaceDetails(html, replacement);
  }
  fs.writeFileSync(file, html, 'utf8');
}
