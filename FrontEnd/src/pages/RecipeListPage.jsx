const recipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description:
      "Tomatoes, mozzarella, fresh basil, olive oil. A timeless classic.",
    image: "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg",
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, parmesan, and egg yolk.",
    image: "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg",
  },
  {
    id: 3,
    title: "Thai Green Curry",
    description: "Spicy and aromatic curry with coconut milk and veggies.",
    image: "https://images.pexels.com/photos/1111315/pexels-photo-1111315.jpeg",
  },
  {
    id: 4,
    title: "Grilled Salmon",
    description: "Perfectly grilled salmon fillet with lemon and herbs.",
    image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
  },
  {
    id: 5,
    title: "Caesar Salad",
    description: "Crispy lettuce, creamy dressing, croutons, and parmesan.",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center.",
    image: "https://images.pexels.com/photos/4109994/pexels-photo-4109994.jpeg",
  },
];

const RecipeListPage = () => {
  return (
    <section
      className="min-h-screen py-16 px-4 md:px-8"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Explore Delicious Recipes
        </h1>
        <p className="text-lg text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
          Browse a handpicked selection of mouth-watering recipes from around
          the world.
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map(({ id, title, description, image }) => (
          <div
            key={id}
            className="bg-[color:var(--color-card)] border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ borderColor: "var(--color-border)" }}
          >
            <img src={image} alt={title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                {title}
              </h2>
              <p className="text-[color:var(--color-text-muted)] mb-4">
                {description}
              </p>
              <button
                className="px-4 py-2 rounded-md font-medium transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-text-primary)",
                }}
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeListPage;
