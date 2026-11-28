/**
 * Call Forth: Daily light quotations.
 * Curated from Suzanne's Notion database "Artist Quotations about Art" (120 of about 200 rows).
 *
 * Each quote is tagged with the blocks it suits (b). Block ids: teeth, blank, next, real, mood, tired, over, under.
 * "any" quotes also serve Straight to making (block id "ready").
 * att: "C" = Certain in Notion (show the name), "U" = Uncertain, "N" = not yet checked (show "Attributed to [name]").
 *
 * Rule: a person never sees the same quote twice until they have seen every quote. Each Daily light shows an unseen
 * quote matched to today's block; when that block's quotes are used up, any unseen quote; when every quote has been
 * seen, the cycle starts again (never repeating the one just shown). The first session ever saved always gets
 * Emerson's "Every artist was first an amateur."
 *
 * Usage:
 *   import { pickQuote, attributionLine } from './quotes';
 *   const quote = pickQuote({ block, seen: profile.seenQuotes, firstEver });
 *   profile.seenQuotes = [...(quote.resetSeen ? [] : profile.seenQuotes), quote.id];   // save with the person
 *   show `“${quote.q}”` and `— ${attributionLine(quote)}`
 */
export type Attribution = 'C' | 'U' | 'N';
export interface Quote { id: number; by: string; q: string; att: Attribution; b: string[] }

export const QUOTES: Quote[] = [
  {"id": 1, "by": "Maya Angelou", "q": "You may encounter many defeats, but you must not be defeated. In fact, it may be necessary to encounter the defeats, so you can know who you are, what you can rise from, how you can still come out of it.", "att": "N", "b": ["tired", "real"]},
  {"id": 2, "by": "Johann Wolfgang von Goethe", "q": "In the realm of ideas, everything depends on enthusiasm... In the real world, all rests on perseverance.", "att": "N", "b": ["mood", "tired"]},
  {"id": 3, "by": "Samuel Beckett", "q": "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.", "att": "N", "b": ["teeth", "real", "blank", "any"]},
  {"id": 4, "by": "E.L. Doctorow", "q": "Writing is an exploration. You start from nothing and learn as you go.", "att": "N", "b": ["next", "blank"]},
  {"id": 5, "by": "Robert Frost", "q": "In three words I can sum up everything I've learned about life: It goes on.", "att": "N", "b": ["tired"]},
  {"id": 6, "by": "Samuel Johnson", "q": "Great works are performed, not by strength, but by perseverance.", "att": "N", "b": ["tired", "mood"]},
  {"id": 7, "by": "James A. Michener", "q": "Character consists of what you do on the third and fourth tries.", "att": "N", "b": ["tired", "teeth"]},
  {"id": 8, "by": "Henry Wadsworth Longfellow", "q": "Perseverance is a great element of success. If you only knock long enough and loud enough at the gate, you are sure to wake up somebody.", "att": "N", "b": ["tired", "mood"]},
  {"id": 9, "by": "Andrew Wyeth", "q": "I dream a lot. I do more painting when I'm not painting. It's in the subconscious.", "att": "N", "b": ["next", "tired"]},
  {"id": 10, "by": "Mel Robson", "q": "I think it's important to remember that making art is a process. It is never finished. The occupation itself is one of process, exploration, and experimentation. It is one of questioning and examining.", "att": "N", "b": ["next"]},
  {"id": 11, "by": "Henry Ward Beecher", "q": "Every artist dips his brush in his own soul, and paints his own nature into his pictures.", "att": "N", "b": ["real"]},
  {"id": 12, "by": "Claude Monet", "q": "I would like to paint the way a bird sings.", "att": "N", "b": ["over", "mood", "any"]},
  {"id": 13, "by": "Robert Henri", "q": "The object isn't to make art, it's to be in that wonderful state which makes art inevitable.", "att": "N", "b": ["mood", "any"]},
  {"id": 14, "by": "Julio Cortázar", "q": "All profound distraction opens certain doors. You have to allow yourself to be distracted when you are unable to concentrate.", "att": "N", "b": ["over"]},
  {"id": 15, "by": "John Updike", "q": "What art offers is space — a certain breathing room for the spirit.", "att": "N", "b": ["over"]},
  {"id": 16, "by": "Friedrich Nietzsche", "q": "Art is the proper task of life. The essence of all beautiful art, all great art, is gratitude.", "att": "N", "b": ["any"]},
  {"id": 17, "by": "Vincent van Gogh", "q": "If you hear a voice within you say 'you cannot paint,' then by all means paint, and that voice will be silenced.", "att": "N", "b": ["real", "teeth", "blank"]},
  {"id": 18, "by": "Balthus", "q": "Painting is a source of endless pleasure, but also of great anguish.", "att": "N", "b": ["teeth"]},
  {"id": 19, "by": "Alfred Tonnelle", "q": "The artist does not see things as they are, but as he is.", "att": "N", "b": ["real"]},
  {"id": 20, "by": "Robert Henri", "q": "Everything depends on the attitude of the artist toward his subject. It is essential.", "att": "N", "b": ["mood"]},
  {"id": 21, "by": "René Magritte", "q": "Art evokes the mystery without which the world would not exist.", "att": "N", "b": ["next"]},
  {"id": 22, "by": "Sylvia Plath", "q": "The worst enemy to creativity is self-doubt.", "att": "N", "b": ["real"]},
  {"id": 23, "by": "Pablo Picasso", "q": "The world today doesn't make sense, so why should I paint pictures that do?", "att": "N", "b": ["over"]},
  {"id": 24, "by": "Alex Noble", "q": "The day is an empty canvas, the shapes and colors are yours to choose.", "att": "N", "b": ["blank", "any"]},
  {"id": 25, "by": "Lisa Golightly", "q": "There is no 'right' way to make art. The only wrong is in not trying, not doing. Don't put barriers up that aren't there — just get to work and make something.", "att": "N", "b": ["blank", "teeth", "real"]},
  {"id": 26, "by": "André Gide", "q": "Art is a collaboration between God and the artist, and the less the artist does the better.", "att": "N", "b": ["tired"]},
  {"id": 27, "by": "Isabel Allende", "q": "Show up, show up, show up, and after awhile the muse shows up, too. If she doesn't show up invited, eventually she just shows up.", "att": "N", "b": ["teeth", "mood", "any"]},
  {"id": 28, "by": "Elbert Hubbard", "q": "Art is not a thing; it is a way.", "att": "N", "b": ["any"]},
  {"id": 29, "by": "Auguste Rodin", "q": "I invent nothing, I rediscover.", "att": "N", "b": ["real", "next"]},
  {"id": 30, "by": "Helen Frankenthaler", "q": "There are no rules. That is how art is born, how breakthroughs happen. Go against the rules or ignore the rules. That is what invention is about.", "att": "N", "b": ["under", "real"]},
  {"id": 31, "by": "Vincent van Gogh", "q": "I would rather die of passion than of boredom.", "att": "N", "b": ["under"]},
  {"id": 32, "by": "Keith Haring", "q": "Art should be something that liberates your soul, provokes the imagination and encourages people to go further.", "att": "N", "b": ["under"]},
  {"id": 33, "by": "Miles Davis", "q": "Do not fear mistakes — there are none.", "att": "N", "b": ["blank", "real"]},
  {"id": 34, "by": "Harley Brown", "q": "That stroke you are about to make on a painting is as much you as the next word you utter or the next breath you take.", "att": "N", "b": ["real", "blank"]},
  {"id": 35, "by": "Jean-Michel Basquiat", "q": "I want to make paintings that look as if they were made by a child.", "att": "N", "b": ["real", "under"]},
  {"id": 36, "by": "Ashley Goldberg", "q": "I think some of the biggest bursts of creativity and artistic growth I've had are usually preceded by a big creative block.", "att": "N", "b": ["teeth", "next"]},
  {"id": 37, "by": "Lori McNee", "q": "The only time I am truly in the Now is when I paint.", "att": "N", "b": ["over"]},
  {"id": 38, "by": "Stephen Nachmanovitch", "q": "The troublesome parts of our work, the parts that are most baffling and frustrating, are in fact the growing edges. We see these opportunities the instant we drop our preconceptions and our self-importance.", "att": "N", "b": ["next", "teeth"]},
  {"id": 39, "by": "Paul Gauguin", "q": "I shut my eyes in order to see.", "att": "N", "b": ["over"]},
  {"id": 40, "by": "Bob Ross", "q": "We don't make mistakes, just happy little accidents.", "att": "N", "b": ["blank", "real"]},
  {"id": 41, "by": "Frida Kahlo", "q": "I paint myself because I am alone. I paint myself because I am the subject I know best.", "att": "N", "b": ["real"]},
  {"id": 42, "by": "Sigmund Freud", "q": "When inspiration doesn't come, I go halfway to meet it.", "att": "N", "b": ["mood", "next"]},
  {"id": 43, "by": "Caio Fonseca", "q": "When I have a creative block, I take walks. I like to see what shapes stick out — so many legs rushing by at once, it can seem abstract. I don't need to see great art to get stirred up. Music does that for me more easily.", "att": "N", "b": ["over", "next"]},
  {"id": 44, "by": "Maya Angelou", "q": "You can't use up creativity. The more you use, the more you have.", "att": "N", "b": ["tired", "under", "any"]},
  {"id": 45, "by": "Sydney Pink", "q": "The idea of divine inspiration and an aha moment is largely a fantasy. Anything of value comes from hard work and unwavering dedication. If you want to be a good artist you need to look at other artists, make a lot of crappy art, and just keep working.", "att": "N", "b": ["teeth", "real", "mood"]},
  {"id": 46, "by": "Yayoi Kusama", "q": "I have a flood of ideas in my mind. I just follow my vision.", "att": "N", "b": ["under"]},
  {"id": 47, "by": "Wassily Kandinsky", "q": "If the artist has outer and inner eyes for nature, nature rewards him by giving him inspiration.", "att": "N", "b": ["under"]},
  {"id": 48, "by": "Paul Cézanne", "q": "To my mind one does not put oneself in place of the past, one only adds a new link.", "att": "N", "b": ["real"]},
  {"id": 49, "by": "Ansel Adams", "q": "You don't take a photograph, you make it.", "att": "N", "b": ["blank"]},
  {"id": 50, "by": "Gustav Klimt", "q": "Art is a line around your thoughts.", "att": "N", "b": ["next"]},
  {"id": 51, "by": "John Ruskin", "q": "Fine art is that in which the hand, the head, and the heart of man go together.", "att": "N", "b": ["any"]},
  {"id": 52, "by": "Louise Bourgeois", "q": "It is not so much where my motivation comes from but rather how it manages to survive.", "att": "N", "b": ["tired", "mood"]},
  {"id": 53, "by": "Vincent van Gogh", "q": "As practice makes perfect, I cannot but make progress; each drawing one makes, each study one paints, is a step forward.", "att": "N", "b": ["real", "tired", "any"]},
  {"id": 54, "by": "Anne Tucker", "q": "All art requires courage.", "att": "N", "b": ["blank"]},
  {"id": 55, "by": "Chuck Close", "q": "Inspiration is for amateurs — the rest of us just show up and get to work.", "att": "N", "b": ["mood", "teeth"]},
  {"id": 56, "by": "Claude Monet", "q": "The richness I achieve comes from nature, the source of my inspiration.", "att": "N", "b": ["under"]},
  {"id": 57, "by": "Albert Einstein", "q": "Imagination is more important than knowledge.", "att": "N", "b": ["under"]},
  {"id": 58, "by": "Eckhart Tolle", "q": "All true artists, whether they know it or not, create from a place of no-mind, from inner stillness.", "att": "N", "b": ["over"]},
  {"id": 59, "by": "Ralph Waldo Emerson", "q": "Every artist was first an amateur.", "att": "N", "b": ["real"]},
  {"id": 60, "by": "Vincent van Gogh", "q": "If one really loves nature, one can find beauty everywhere.", "att": "N", "b": ["under"]},
  {"id": 61, "by": "Joan Miró", "q": "The works must be conceived with fire in the soul but executed with clinical coolness.", "att": "N", "b": ["over"]},
  {"id": 62, "by": "George Bernard Shaw", "q": "Without art, the crudeness of reality would make the world unbearable.", "att": "N", "b": ["tired"]},
  {"id": 63, "by": "Pierre-Auguste Renoir", "q": "You come to nature with all her theories, and she knocks them all flat.", "att": "N", "b": ["next"]},
  {"id": 64, "by": "Eugène Delacroix", "q": "Artists who seek perfection in everything are those who can't attain it in anything.", "att": "N", "b": ["real", "blank"]},
  {"id": 65, "by": "George Inness", "q": "The true use of art is, first, to cultivate the artist's own spiritual nature.", "att": "N", "b": ["tired"]},
  {"id": 66, "by": "Vincent van Gogh", "q": "I am seeking. I am striving. I am in it with all my heart.", "att": "U", "b": ["teeth", "mood"]},
  {"id": 67, "by": "Oscar Wilde", "q": "No great artist ever sees things as they really are. If he did, he would cease to be an artist.", "att": "C", "b": ["real"]},
  {"id": 68, "by": "Pablo Picasso", "q": "Art is a lie that makes us realize truth.", "att": "C", "b": ["any"]},
  {"id": 69, "by": "James McNeill Whistler", "q": "An artist is not paid for his labor but for his vision.", "att": "U", "b": ["real"]},
  {"id": 70, "by": "Pablo Picasso", "q": "Painting is just another way of keeping a diary.", "att": "U", "b": ["tired"]},
  {"id": 71, "by": "Salvador Dalí", "q": "Have no fear of perfection, you'll never reach it.", "att": "U", "b": ["blank", "real"]},
  {"id": 72, "by": "Paul Gardner", "q": "A painting is never finished — it simply stops in interesting places.", "att": "U", "b": ["next"]},
  {"id": 73, "by": "Marc Chagall", "q": "If I create from the heart, nearly everything works; if from the head, almost nothing.", "att": "U", "b": ["over"]},
  {"id": 74, "by": "Pablo Picasso", "q": "It took me four years to paint like Raphael, but a lifetime to paint like a child.", "att": "U", "b": ["real"]},
  {"id": 75, "by": "Andy Warhol", "q": "Don't think about making art, just get it done. Let everyone else decide if it's good or bad, whether they love it or hate it. While they are deciding, make even more art.", "att": "U", "b": ["teeth", "real"]},
  {"id": 76, "by": "Twyla Tharp", "q": "Art is the only way to run away without leaving home.", "att": "C", "b": ["tired", "over"]},
  {"id": 77, "by": "Martin Kippenberger", "q": "A good artist has less time than ideas.", "att": "U", "b": ["under"]},
  {"id": 78, "by": "Pablo Picasso", "q": "Every child is an artist. The problem is how to remain an artist once he grows up.", "att": "U", "b": ["real"]},
  {"id": 79, "by": "René Magritte", "q": "Life obliges me to do something, so I paint.", "att": "U", "b": ["mood"]},
  {"id": 80, "by": "Pablo Picasso", "q": "There are painters who transform the sun into a yellow spot, but there are others who, thanks to their art and intelligence, transform a yellow spot into the sun.", "att": "U", "b": ["under"]},
  {"id": 81, "by": "Frida Kahlo", "q": "I never paint dreams or nightmares. I paint my own reality.", "att": "C", "b": ["real"]},
  {"id": 82, "by": "Vincent van Gogh", "q": "I want to touch people with my art. I want them to say 'he feels deeply, he feels tenderly.'", "att": "C", "b": ["real"]},
  {"id": 83, "by": "Jackson Pollock", "q": "Every good painter paints what he is.", "att": "C", "b": ["real"]},
  {"id": 84, "by": "Henri Matisse", "q": "Creativity takes courage.", "att": "U", "b": ["blank"]},
  {"id": 85, "by": "Francis Bacon", "q": "The job of the artist is always to deepen the mystery.", "att": "U", "b": ["next"]},
  {"id": 86, "by": "Edvard Munch", "q": "Nature is not only all that is visible to the eye... it also includes the inner pictures of the soul.", "att": "U", "b": ["over"]},
  {"id": 87, "by": "Georgia O'Keeffe", "q": "Whether you succeed or not is irrelevant, there is no such thing. Making your unknown known is the important thing.", "att": "U", "b": ["teeth", "real", "blank"]},
  {"id": 88, "by": "Leonardo da Vinci", "q": "One can have no smaller or greater mastery than mastery of oneself.", "att": "C", "b": ["mood"]},
  {"id": 89, "by": "Henry Moore", "q": "To be an artist is to believe in life.", "att": "U", "b": ["tired"]},
  {"id": 90, "by": "Jean-Jacques Rousseau", "q": "The world of reality has its limits; the world of imagination is boundless.", "att": "N", "b": ["under"]},
  {"id": 91, "by": "Georgia O'Keeffe", "q": "I found I could say things with color and shapes that I couldn't say any other way — things I had no words for.", "att": "N", "b": ["next"]},
  {"id": 92, "by": "Stella Adler", "q": "Life beats down and crushes the soul and art reminds you that you have one.", "att": "N", "b": ["tired"]},
  {"id": 93, "by": "Edgar Degas", "q": "Art is not what you see, but what you make others see.", "att": "N", "b": ["real"]},
  {"id": 94, "by": "Lucian Freud", "q": "The longer you look at an object, the more abstract it becomes, and, ironically, the more real.", "att": "N", "b": ["over"]},
  {"id": 95, "by": "Henry David Thoreau", "q": "It's not what you look at that matters, it's what you see.", "att": "N", "b": ["over"]},
  {"id": 96, "by": "Paul Valéry", "q": "An artist never really finishes his work; he merely abandons it.", "att": "N", "b": ["next"]},
  {"id": 97, "by": "Paul Cézanne", "q": "Don't be an art critic, but paint, there lies salvation.", "att": "N", "b": ["teeth", "real"]},
  {"id": 98, "by": "Charles Horton Cooley", "q": "An artist cannot fail; it is a success to be one.", "att": "N", "b": ["real"]},
  {"id": 99, "by": "Theodore Dreiser", "q": "Art is the stored honey of the human soul.", "att": "N", "b": ["tired"]},
  {"id": 100, "by": "Vincent van Gogh", "q": "Love always brings difficulties, that is true, but the good side of it is that it gives energy.", "att": "N", "b": ["tired"]},
  {"id": 101, "by": "Edgar Degas", "q": "Painting is easy when you don't know how, but very difficult when you do.", "att": "N", "b": ["real"]},
  {"id": 102, "by": "Pablo Picasso", "q": "The artist is a receptacle for emotions that come from all over the place: from the sky, from the earth, from a scrap of paper, from a passing shape, from a spider's web.", "att": "N", "b": ["under"]},
  {"id": 103, "by": "Émile Zola", "q": "If you ask me what I came to do in this world, I, an artist, will answer you: I am here to live out loud.", "att": "N", "b": ["under", "mood"]},
  {"id": 104, "by": "Wassily Kandinsky", "q": "There is no must in art because art is free.", "att": "N", "b": ["teeth", "over"]},
  {"id": 105, "by": "Vincent van Gogh", "q": "I dream of painting and then I paint my dream.", "att": "N", "b": ["next"]},
  {"id": 106, "by": "Kurt Vonnegut", "q": "To practice any art, no matter how well or badly, is a way to make your soul grow. So do it.", "att": "N", "b": ["real", "mood", "any"]},
  {"id": 107, "by": "Paul Strand", "q": "The artist's world is limitless. It can be found anywhere, far from where he lives or a few feet away. It is always on his doorstep.", "att": "N", "b": ["under"]},
  {"id": 108, "by": "Auguste Rodin", "q": "The main thing is to be moved, to love, to hope, to tremble, to live.", "att": "N", "b": ["mood", "under"]},
  {"id": 109, "by": "Henry Moore", "q": "There's no retirement for an artist, it's your way of living so there's no end to it.", "att": "N", "b": ["tired"]},
  {"id": 110, "by": "Berthe Morisot", "q": "It is important to express oneself...provided the feelings are real and are taken from your own experience.", "att": "N", "b": ["real"]},
  {"id": 111, "by": "Andy Warhol", "q": "They always say time changes things, but you actually have to change them yourself.", "att": "N", "b": ["teeth", "mood"]},
  {"id": 112, "by": "Vincent van Gogh", "q": "Great things are done by a series of small things brought together.", "att": "N", "b": ["blank", "next", "tired", "any"]},
  {"id": 113, "by": "Georgia O'Keeffe", "q": "To create one's own world takes courage.", "att": "N", "b": ["real", "blank"]},
  {"id": 114, "by": "Vincent van Gogh", "q": "The emotions are sometimes so strong that I work without knowing it. The strokes come like speech.", "att": "N", "b": ["mood"]},
  {"id": 115, "by": "Salvador Dalí", "q": "Those who do not want to imitate anything, produce nothing.", "att": "N", "b": ["under"]},
  {"id": 116, "by": "Edward Hopper", "q": "If I could say it in words there would be no reason to paint.", "att": "N", "b": ["next"]},
  {"id": 117, "by": "Michelangelo", "q": "If people knew how hard I worked to get my mastery, it wouldn't seem so wonderful at all.", "att": "N", "b": ["real"]},
  {"id": 118, "by": "Piet Mondrian", "q": "The position of the artist is humble. He is essentially a channel.", "att": "N", "b": ["tired", "over"]},
  {"id": 119, "by": "Vincent van Gogh", "q": "I wish they would only take me as I am.", "att": "N", "b": ["real"]},
  {"id": 120, "by": "Robert Hughes", "q": "The greater the artist, the greater the doubt. Perfect confidence is granted to the less talented as a consolation prize.", "att": "N", "b": ["real"]}
];

const FIRST_QUOTE_ID = 59;

export function attributionLine(q: Quote): string {
  return q.att === 'C' ? q.by : `Attributed to ${q.by}`;
}

export function pickQuote(opts: { block: string | null; seen: number[]; firstEver?: boolean; random?: () => number }): Quote & { resetSeen: boolean } {
  const rand = opts.random ?? Math.random;
  const seen = new Set(opts.seen);
  const pickFrom = (pool: Quote[]): Quote => pool[Math.floor(rand() * pool.length)] as Quote;
  if (opts.firstEver && !seen.has(FIRST_QUOTE_ID)) {
    const first = QUOTES.find(x => x.id === FIRST_QUOTE_ID);
    if (first) return { ...first, resetSeen: false };
  }
  const tag = opts.block && opts.block !== 'ready' ? opts.block : 'any';
  let pool = QUOTES.filter(x => x.b.includes(tag) && !seen.has(x.id));
  if (!pool.length) pool = QUOTES.filter(x => !seen.has(x.id));
  if (pool.length) return { ...pickFrom(pool), resetSeen: false };
  const last = opts.seen[opts.seen.length - 1];
  pool = QUOTES.filter(x => x.b.includes(tag) && x.id !== last);
  if (!pool.length) pool = QUOTES.filter(x => x.id !== last);
  return { ...pickFrom(pool), resetSeen: true };
}
