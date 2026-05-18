import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputFile = path.join(__dirname, '..', 'src', 'images.js');

const romanticPhrases = [
  { title: "Sweet Beginning", desc: "Where our beautiful story truly began." },
  { title: "Cherished Moments", desc: "Every second spent with you is an absolute treasure." },
  { title: "Our Journey", desc: "Walking hand in hand through this beautiful, crazy life." },
  { title: "Happy Memories", desc: "Your laugh is by far my favorite soundtrack in the world." },
  { title: "Sweetest Love", desc: "Forever and always, you are my absolute number one." },
  { title: "Beautiful Smiles", desc: "Making every single moment bright with your radiant love." },
  { title: "Forever Yours", desc: "Blessed with the most kind and amazing partner in the world." },
  { title: "Pure Joy", desc: "A whole year of endless laughter, tickles, and happiness." },
  { title: "Holding Hands", desc: "Stronger together, side by side through every season." },
  { title: "Perfect Moments", desc: "The absolute highlight of my life is being with you." },
  { title: "Heart to Heart", desc: "Connected in deep ways that words can never describe." },
  { title: "Sweet Embrace", desc: "In your warm arms is my safest, favorite place to be." },
  { title: "Golden Times", desc: "A year down, and a beautiful lifetime of memories to go." },
  { title: "Loving Smiles", desc: "Loving you is the easiest, most natural thing I've ever done." },
  { title: "Together Forever", desc: "To many more decades of absolute bliss and passion." },
  { title: "Warm Hugs", desc: "With you, even the coldest winter days feel like sunny mornings." },
  { title: "Sweet Whispers", desc: "You speak to my soul in a gentle language only we understand." },
  { title: "Sun-kissed", desc: "Your natural beauty outshines the brightest summer sun." },
  { title: "Cozy Days", desc: "Snuggled up close to you is my absolute favorite destination." },
  { title: "Coffee Dates", desc: "Sipping warm coffee and talking about our beautiful future." },
  { title: "Beach Walks", desc: "Leaving footprints in the sand, but forever in my heart." },
  { title: "Rainy Days", desc: "Sharing an umbrella with you, dancing in the warm rain." },
  { title: "Late Night Talks", desc: "Whispering our wildest dreams under a sky full of stars." },
  { title: "Finger Fits", desc: "My fingers fit perfectly in yours, like they were meant for it." },
  { title: "Perfect Heartbeats", desc: "My heart beats in perfect, warm synchronization with yours." },
  { title: "Dreamy Eyes", desc: "One look into your sweet eyes and I lose myself in happiness." },
  { title: "My Safe Haven", desc: "You are the calm in my storm, my ultimate peaceful shelter." },
  { title: "Eternal Spark", desc: "Loving you is not a choice, it is my very breath and pulse." },
  { title: "Laughter & Joy", desc: "Your sweet laughter is the most beautiful sound in the universe." },
  { title: "First Spark", desc: "That same magic is alive in my heart every single day." },
  { title: "Golden Hour", desc: "Glowing in the soft evening light, looking like a total angel." },
  { title: "Quiet Evenings", desc: "Just being near you is all the peace I could ever ask for." },
  { title: "Blessed Hearts", desc: "Every day, I thank the stars for bringing you into my life." },
  { title: "Infinite Love", desc: "Beyond the stars, past the moon, I love you infinitely." },
  { title: "A Perfect Team", desc: "Together, we can conquer any mountain and cross any ocean." },
  { title: "Melting Worries", desc: "Your gorgeous smile makes all my worries melt away instantly." },
  { title: "My Only Star", desc: "Looking at the night sky, but my eyes are always drawn to you." },
  { title: "Kindred Souls", desc: "Destined to meet, designed to love, bound to be together." },
  { title: "My Greatest Happiness", desc: "You are the single best thing that has ever happened to me." },
  { title: "Pure Elegance", desc: "Your grace and natural beauty take my breath away every time." },
  { title: "Warm Embrace", desc: "Where time stands still, and only our warm heartbeat remains." },
  { title: "A Beautiful Story", desc: "Our first year was magical, and our book is just beginning." },
  { title: "Home With You", desc: "Home is no longer a place, it is wherever you are." },
  { title: "Cherished Smile", desc: "That sweet smile of yours can light up the darkest of nights." },
  { title: "True Bliss", desc: "Every ordinary day becomes extraordinary when shared with you." },
  { title: "My True Sweetheart", desc: "My favorite place in the entire world is right beside you." },
  { title: "Our Happy Place", desc: "Surrounded by love, laughter, and your beautiful presence." },
  { title: "Simply Perfect", desc: "No matter what happens, you are my perfect forever." },
  { title: "Heart's Delight", desc: "You fill my life with so much color, warmth, and sunshine." },
  { title: "Loving You More", desc: "I love you more than words could ever explain, my sweetheart." },
  { title: "Soul Connection", desc: "We don't just share sweet moments, we share our entire souls." },
  { title: "Your Gentle Touch", desc: "Just one soft touch from you makes my heart race with joy." },
  { title: "Sweet Memory", desc: "Looking back at this moment, my heart swells with gratitude." },
  { title: "Dream Come True", desc: "I used to dream of a love like this, and now I am living it." },
  { title: "Sparkling Eyes", desc: "Your eyes shine brighter than a diamond, full of pure love." },
  { title: "Forever & Always", desc: "A lifetime promise of endless love, through every high and low." },
  { title: "My Bright Light", desc: "You guide me through the dark and fill my days with brightness." },
  { title: "Magic Moments", desc: "Every little memory with you feels like pure romantic stardust." },
  { title: "True Devotion", desc: "My love for you grows deeper with every single rising sun." },
  { title: "Perfect Harmony", desc: "Our lives blend together in the sweetest, most beautiful song." },
  { title: "My Queen", desc: "You rule my heart with your kindness, grace, and sweet love." },
  { title: "Sweet Escape", desc: "Stealing away from the world, just you and me together." },
  { title: "Treasured Times", desc: "Holding these sweet memories close to my heart forever." },
  { title: "Unconditional Love", desc: "Loving you fully, deeply, and without any limits or fears." },
  { title: "My Whole Heart", desc: "You hold the key to my heart, now and for all eternity." },
  { title: "Romantic Breeze", desc: "Felt like the wind itself was celebrating our beautiful bond." },
  { title: "Lucky In Love", desc: "I am the luckiest person alive to hold your hand every day." },
  { title: "Sweet Whispers", desc: "Listening to the sweet sound of your voice is pure heaven." },
  { title: "Radiant Beauty", desc: "Your inner light shines so brightly, making everything beautiful." },
  { title: "Blessed Union", desc: "Two hearts beat as one, united in endless affection." },
  { title: "My Warm Shelter", desc: "Your arms are the warmest, most comfortable place on earth." },
  { title: "Love In The Air", desc: "Breathing in the happiness of being yours, completely." },
  { title: "Endless Laughter", desc: "Making you laugh is my favorite daily mission." },
  { title: "Happy Hearts", desc: "A single smile from you makes my entire world light up." },
  { title: "My Love Story", desc: "The most beautiful chapter of my life is the one with you." },
  { title: "Grateful Heart", desc: "Thankful for your kindness, patience, and endless love." },
  { title: "Magical Love", desc: "Our bond is built on trust, laughter, and pure magic." },
  { title: "Sweet Sunshine", desc: "You are the warm ray of light that brightens my day." },
  { title: "My Forever Home", desc: "Resting my head on your shoulder, feeling perfectly safe." },
  { title: "Perfect Match", desc: "Made for each other, walking together on this beautiful path." },
  { title: "Deep Connection", desc: "A love so strong and deep that it bridges any distance." },
  { title: "Loving Gazes", desc: "Looking into your eyes and seeing my entire future." },
  { title: "Pure Devotion", desc: "Holding onto you, promising to love you more each day." },
  { title: "A Beautiful Dream", desc: "Being with you feels like a dream I never want to wake from." },
  { title: "Sweet Comfort", desc: "Your gentle presence brings so much peace to my soul." },
  { title: "Treasured Memories", desc: "Capturing these precious moments to look back on forever." },
  { title: "Heart's Comfort", desc: "With you, my heart finds its true peace and rest." },
  { title: "Beautiful Journey", desc: "Every step we take together is filled with joy and love." },
  { title: "My Better Half", desc: "You complete me in every single way, my sweet love." },
  { title: "Endless Romance", desc: "Falling in love with you over and over, every single day." },
  { title: "Sparkling Love", desc: "Our love shines brighter than the stars in the night sky." },
  { title: "My Safe Place", desc: "Locked in your warm embrace, feeling completely protected." },
  { title: "Beautiful Smiles", desc: "Your smile is the sunrise that starts my day with joy." },
  { title: "True Companion", desc: "The best partner, best friend, and love of my life." },
  { title: "Magical Journey", desc: "A whole year of beautiful adventures, looking forward to more." },
  { title: "Sweet Devotion", desc: "You are my heart's greatest desire, now and forever." },
  { title: "Warm Sunshine", desc: "Filling my life with warmth, brightness, and pure joy." },
  { title: "Deeply In Love", desc: "My feelings for you grow stronger with each passing second." },
  { title: "My Sweet Angel", desc: "Guiding me with your gentle love and beautiful spirit." },
  { title: "Golden Memories", desc: "Cherishing every single second of our wonderful year." },
  { title: "Pure Happiness", desc: "My heart is completely full when I am right next to you." },
  { title: "Blessed Hearts", desc: "Growing closer and stronger in love with each new day." },
  { title: "Endless Devotion", desc: "My commitment to you is as deep and infinite as the sea." },
  { title: "Sweet Serenade", desc: "Our love is a beautiful melody that plays in my heart." },
  { title: "My Safe Harbor", desc: "Where the storm stops, and only peace and warmth remain." },
  { title: "Beautiful Times", desc: "Every moment we share is a memory I will always cherish." },
  { title: "Forever Bound", desc: "United by love, respect, and a promise of a lifetime." },
  { title: "My True Love", desc: "You are the love I have waited for my entire life." },
  { title: "Gentle Embrace", desc: "Holding you close, wishing this moment would last forever." },
  { title: "Loving Heart", desc: "You fill my soul with so much warmth, kindness, and light." },
  { title: "Infinite Joy", desc: "The happiness you bring into my life is truly limitless." },
  { title: "My Happy Ending", desc: "Every story is beautiful, but ours is my absolute favorite." },
  { title: "Sweetest Smiles", desc: "Your joy is my joy, and your smile is my daily inspiration." },
  { title: "Cherished Partner", desc: "Walking hand in hand, facing the world together in love." },
  { title: "Glorious Days", desc: "Looking forward to thousands of more beautiful days with you." },
  { title: "My Whole World", desc: "You are my today, my tomorrow, and my entire forever." },
  { title: "Tender Moments", desc: "Cherishing the soft, quiet moments of love we share." },
  { title: "Perfect Together", desc: "Flawed individually, but absolutely perfect as one." },
  { title: "My Shining Star", desc: "Brightening my path and filling my life with sweet wonder." },
  { title: "Deepest Affection", desc: "With a heart completely full of love and gratitude for you." },
  { title: "My Cozy Nest", desc: "Warm, quiet, and filled with your sweet scent and love." },
  { title: "Loving Whispers", desc: "Saying 'I love you' in a thousand silent, tender ways." },
  { title: "Soulmate Bound", desc: "Connected by destiny, living our dream every single day." },
  { title: "Sweetest Anniversary", desc: "Celebrating 365 days of absolute bliss and pure love." },
  { title: "Looking Forward", desc: "To a beautiful lifetime of making gorgeous memories together." }
];

try {
  const files = fs.readdirSync(imagesDir);
  let jpegs = files
    .filter(file => file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg'))
    .sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

  // Explicitly force the user's requested cover picture to be the 1st visible memory
  const targetCoverImage = 'WhatsApp Image 2026-05-18 at 9.15.27 PM.jpeg';
  const targetIndex = jpegs.indexOf(targetCoverImage);
  if (targetIndex !== -1) {
    jpegs.splice(targetIndex, 1);
    jpegs.unshift(targetCoverImage);
  }

  const video = files.find(file => file.toLowerCase().endsWith('.mp4'));

  const items = jpegs.map((file, index) => {
    const phrase = romanticPhrases[index % romanticPhrases.length];
    return {
      image: `/images/${file}`,
      link: '#',
      title: `${phrase.title} #${index + 1}`,
      description: phrase.desc
    };
  });

  const fileContent = `// Automatically generated list of images
export const items = ${JSON.stringify(items, null, 2)};

export const videoUrl = ${video ? JSON.stringify(`/images/${video}`) : 'null'};
`;

  fs.writeFileSync(outputFile, fileContent, 'utf-8');
  console.log(`Successfully generated ${outputFile} with ${items.length} items.`);
} catch (error) {
  console.error('Error generating images list:', error);
}
