

const recipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description:
      "A simple and delicious pizza topped with fresh tomatoes, mozzarella, and basil.",
    image:
      "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg",
  },
  {
    id: 2,
    title: "Avocado Toast",
    description:
      "Creamy avocado spread on toasted sourdough, topped with cherry tomatoes and chili flakes.",
    image:
      "https://images.pexels.com/photos/33332968/pexels-photo-33332968.jpeg",
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    description:
      "Warm, gooey chocolate chip cookies fresh out of the oven. Perfect for any sweet tooth.",
    image:
      "https://images.pexels.com/photos/33323283/pexels-photo-33323283.jpeg",
  },
];

const HomePage = () => {
  return (
    <section
      className="min-h-screen py-16 px-6 md:px-12"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Welcome to RecipeShare
        </h1>
        <p
          className="text-lg md:text-xl text-[color:var(--color-text-muted)] max-w-4xl mx-auto"
        >
          Discover, share, and savor the best recipes from around the world.
          Whether you're a seasoned chef or just starting out, find inspiration
          here.
        </p>
      </div>

      {/* Recipes Grid - full width but with padding */}
      <div className="w-full max-w-screen-xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 px-4">
        {recipes.map(({ id, title, description, image }) => (
          <article
            key={id}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            style={{
              backgroundColor: "var(--color-background)",
              border: `1px solid var(--color-border)`,
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                {title}
              </h2>
              <p className="text-[color:var(--color-text-muted)]">{description}</p>
              <button
                className="mt-4 bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-text-primary)] font-semibold px-4 py-2 rounded transition-colors duration-300"
                aria-label={`View recipe for ${title}`}
              >
                View Recipe
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
