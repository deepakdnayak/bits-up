export default function Info() {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Why Choose BitsUp?</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-blue-600">Diverse Topics</h3>
          <p className="mt-2 text-gray-600">Explore quizzes on coding, logic, aptitude, and more.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-blue-600">Real-Time Leaderboard</h3>
          <p className="mt-2 text-gray-600">Compete with others and track your performance.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-blue-600">No Registration Needed</h3>
          <p className="mt-2 text-gray-600">Just enter your GitHub username and start playing!</p>
        </div>
      </div>
    </section>
  );
}
