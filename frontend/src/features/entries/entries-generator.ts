const adjectives = [
  'happy', 'bright', 'swift', 'calm', 'bold',
  'clever', 'gentle', 'fierce', 'quiet', 'wild',
  'smooth', 'sharp', 'soft', 'dark', 'light',
  'warm', 'cool', 'fresh', 'ancient', 'modern',
  'silent', 'loud', 'quick', 'slow', 'tiny',
  'huge', 'elegant', 'rustic', 'sleek', 'rough',
  'polished', 'raw', 'pure', 'mixed', 'simple',
  'complex', 'narrow', 'wide', 'tall', 'short',
  'deep', 'shallow', 'thick', 'thin', 'dense',
  'sparse', 'heavy', 'light', 'strong', 'weak',
  'solid', 'hollow', 'full', 'empty', 'rich',
  'poor', 'young', 'old', 'new', 'worn',
  'shiny', 'dull', 'clear', 'cloudy', 'bright',
  'dim', 'vivid', 'pale', 'vibrant', 'muted',
  'crisp', 'soft', 'hard', 'tender', 'tough',
  'sweet', 'bitter', 'sour', 'spicy', 'mild',
  'hot', 'cold', 'frozen', 'molten', 'liquid',
  'solid', 'gaseous', 'ethereal', 'cosmic', 'earthly',
  'celestial', 'divine', 'mortal', 'eternal', 'fleeting',
  'swift', 'lazy', 'active', 'passive', 'dynamic'
];

const nouns = [
  'tiger', 'eagle', 'river', 'mountain', 'forest',
  'ocean', 'sky', 'stone', 'flame', 'wind',
  'shadow', 'star', 'cloud', 'thunder', 'wave',
  'moon', 'sun', 'tree', 'valley', 'peak',
  'dragon', 'phoenix', 'wolf', 'bear', 'lion',
  'falcon', 'hawk', 'raven', 'crow', 'dove',
  'sparrow', 'butterfly', 'bee', 'ant', 'spider',
  'serpent', 'snake', 'lizard', 'turtle', 'frog',
  'dolphin', 'whale', 'shark', 'fish', 'coral',
  'island', 'desert', 'tundra', 'jungle', 'prairie',
  'canyon', 'cliff', 'cave', 'waterfall', 'spring',
  'lake', 'pond', 'stream', 'brook', 'bay',
  'harbor', 'port', 'bridge', 'tower', 'castle',
  'fortress', 'temple', 'shrine', 'palace', 'cathedral',
  'village', 'hamlet', 'city', 'metropolis', 'town',
  'road', 'path', 'trail', 'highway', 'boulevard',
  'garden', 'meadow', 'field', 'orchard', 'vineyard',
  'crystal', 'diamond', 'ruby', 'emerald', 'sapphire',
  'gold', 'silver', 'bronze', 'iron', 'steel',
  'thunder', 'lightning', 'storm', 'breeze', 'gale'
];

const generateEntry = (): string => {
  const getRandomElement = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  return `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
};

export default generateEntry;
