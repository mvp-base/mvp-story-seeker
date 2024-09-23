import { RecommendCard } from './RecommendCard';

export function Recommendations(data: object) {
  const recommendations = {
    books: [
      {
        name: 'The Haunting of Hill House',
        coverImage:
          'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/The_Haunting_of_Hill_House_%28book_cover%29.jpg/220px-The_Haunting_of_Hill_House_%28book_cover%29.jpg',
        link: 'https://en.wikipedia.org/wiki/The_Haunting_of_Hill_House',
        shortDesc:
          'A psychologist invites three individuals to live in a haunted house to study paranormal activity.',
        plot: 'The story follows a group of people who are invited to a mansion known for its dysfunctional history and supernatural events, leading to sinister occurrences.',
        genre: 'Horror',
        rating: '4.1/5',
        author: 'Shirley Jackson',
        ISBN: '978-0143039983',
        pageCount: '182',
      },
      {
        name: 'Pet Sematary',
        coverImage:
          'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Pet_Sematary_cover.jpg/220px-Pet_Sematary_cover.jpg',
        link: 'https://en.wikipedia.org/wiki/Pet_Sematary',
        shortDesc:
          'A family discovers that burial in a nearby cemetery can bring the dead back to life, but at a terrible cost.',
        plot: 'When Louis Creed moves to a rural town, he discovers a burial ground that possesses dark powers, leading him down a horrifying path after a tragedy strikes.',
        genre: 'Horror',
        rating: '4.3/5',
        author: 'Stephen King',
        ISBN: '978-0743413005',
        pageCount: '384',
      },
    ],
    movies: [
      {
        name: 'Hereditary',
        coverImage:
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Hereditary_poster.jpg/220px-Hereditary_poster.jpg',
        link: 'https://en.wikipedia.org/wiki/Hereditary_(film)',
        shortDesc:
          'A family begins to unravel terrifying secrets about their ancestry following the death of their secretive grandmother.',
        plot: 'After the death of their reclusive grandmother, a family is haunted by tragic and terrifying occurrences that reveal dark secrets passed down through generations.',
        genre: 'Horror',
        rating: '7.3/10',
        director: 'Ari Aster',
        boxOffice: '$80 million',
        runtime: '127 minutes',
      },
      {
        name: 'The Conjuring',
        coverImage:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/The_Conjuring_poster.jpg/220px-The_Conjuring_poster.jpg',
        link: 'https://en.wikipedia.org/wiki/The_Conjuring',
        shortDesc:
          'Paranormal investigators tackle a haunting at a secluded farmhouse in the 1970s.',
        plot: 'Based on real-life paranormal investigators Ed and Lorraine Warren who work to help a family terrorized by a dark presence in their farmhouse.',
        genre: 'Horror',
        rating: '7.5/10',
        director: 'James Wan',
        boxOffice: '$319 million',
        runtime: '112 minutes.',
      },
    ],
  };

  return (
    <>
      <RecommendCard
        name="Test"
        coverImage={recommendations.books[0].coverImage}
        link="string"
        shortDesc="string"
        plot="string"
        genre="string"
        rating="string"
        author="string"
        ISBN="string"
        pageCount="string"
      />
    </>
  );
}
