const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\russe\\Desktop\\resort';

// Broken Unsplash IDs and their replacements
const imgMap = {
  '1544837581-229f3d95bda8': '1511497584788-876760111969',
  '1504173010664-32509107de36': '1472214103451-9374bd1c798e',
  '1574888126759-9941a3edba10': '1470071131384-001b85755536',
  '1522345579973-2070e5b7fbab': '1426604966848-d7adac402bff'
};

const extraContent = `
    <!-- ═══════════════════════════════════════
         NEW SECTION — COMMITMENT
    ═══════════════════════════════════════ -->
    <section class="section bg-texture section-forest" style="padding-top: 4rem; padding-bottom: 4rem;">
      <div class="container text-center">
        <div class="section-label reveal"><i class="fa-solid fa-leaf"></i> Our Promise</div>
        <h2 class="section-title fs-h3 reveal reveal-delay-1" style="max-width: 800px; margin: 0 auto 2rem;">Preserving the Wild for <em>Future Generations</em></h2>
        <p class="section-desc reveal reveal-delay-2" style="max-width: 700px; margin: 0 auto;">
          We believe that true luxury lies in harmony with nature. Our sustainable practices ensure that every footprint we leave behind is a step towards a greener, wilder planet. Join us in our mission to protect and celebrate the natural world.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         NEW SECTION — EXPLORER STORIES
    ═══════════════════════════════════════ -->
    <section class="section bg-coal section-dusk">
      <div class="container">
        <div class="section-header flex-between" style="margin-bottom: 3rem;">
          <div>
            <div class="section-label reveal">Testimonials</div>
            <h2 class="section-title fs-h2 reveal reveal-delay-1">Explorer <em>Stories</em></h2>
          </div>
        </div>
        <div class="exp-grid">
          <div class="exp-card review-card reveal">
            <div class="review-stars" style="color: var(--gold); margin-bottom: 1rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="exp-card-text" style="font-style: italic; margin-bottom: 1.5rem;">
              "An absolutely life-changing experience. The guides were incredibly knowledgeable and the cinematic beauty of the environment was beyond words. Terravana is a true sanctuary."
            </p>
            <div class="section-label" style="margin: 0; color: var(--gold); font-size: 0.7rem;">— Sarah Jenkins, UK</div>
          </div>
          <div class="exp-card review-card reveal reveal-delay-1">
            <div class="review-stars" style="color: var(--gold); margin-bottom: 1rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="exp-card-text" style="font-style: italic; margin-bottom: 1.5rem;">
              "I've traveled all over the world, but the level of detail and eco-conscious luxury here is unmatched. The immersive nature walks felt like stepping into another world."
            </p>
            <div class="section-label" style="margin: 0; color: var(--gold); font-size: 0.7rem;">— Michael Chen, Canada</div>
          </div>
          <div class="exp-card review-card reveal reveal-delay-2">
            <div class="review-stars" style="color: var(--gold); margin-bottom: 1rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="exp-card-text" style="font-style: italic; margin-bottom: 1.5rem;">
              "If you want to disconnect from the noise of the city and reconnect with the raw pulse of the wild, this is the place. Stunning architecture blending perfectly with nature."
            </p>
            <div class="section-label" style="margin: 0; color: var(--gold); font-size: 0.7rem;">— Emma Rossi, Italy</div>
          </div>
        </div>
      </div>
    </section>
`;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace broken images
    for (const [broken, fixed] of Object.entries(imgMap)) {
      content = content.split(broken).join(fixed);
    }
    
    // Inject new sections before footer
    if (!content.includes('NEW SECTION — EXPLORER STORIES')) {
      content = content.replace('<footer class="footer">', extraContent + '\n    <footer class="footer">');
    }
    
    // Add more content to eco rows
    if (content.includes('<div class="eco-row">') && !content.includes('eco-row-expanded')) {
       content = content.replace('<div class="eco-row">', '<div class="eco-row eco-row-expanded">\\n' + 
       `
          <div class="eco-item reveal">
            <span class="eco-icon" aria-hidden="true"><i class="fa-solid fa-tree"></i></span>
            <div class="section-label" style="margin:0;">Reforestation</div>
            <p class="exp-card-text">
              Every stay contributes to our active planting initiatives, restoring indigenous flora to previously degraded lands surrounding the resort.
            </p>
          </div>
          <div class="eco-item reveal reveal-delay-1">
            <span class="eco-icon" aria-hidden="true"><i class="fa-solid fa-water"></i></span>
            <div class="section-label" style="margin:0;">Water Stewardship</div>
            <p class="exp-card-text">
              100% of our greywater is filtered through natural reed beds and returned to the ecosystem cleaner than when we collected it.
            </p>
          </div>
          <div class="eco-item reveal reveal-delay-2">
            <span class="eco-icon" aria-hidden="true"><i class="fa-solid fa-solar-panel"></i></span>
            <div class="section-label" style="margin:0;">Renewable Energy</div>
            <p class="exp-card-text">
              Our entire off-grid operation is powered by a state-of-the-art micro-hydro and solar array, leaving zero carbon footprint.
            </p>
          </div>
       `);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
console.log('Expansion complete!');
