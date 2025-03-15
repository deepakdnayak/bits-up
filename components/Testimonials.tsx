export default function Testimonials() {
    return (
      <section className="py-12 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center">What Users Say</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8 max-w-5xl mx-auto">
          <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-md text-center">
            <p className="text-lg">"BitsUp helped me improve my coding skills in a fun way!"</p>
            <p className="mt-2 font-semibold">- Rahul S.</p>
          </div>
          <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-md text-center">
            <p className="text-lg">"I love competing with my friends on the leaderboard!"</p>
            <p className="mt-2 font-semibold">- Priya K.</p>
          </div>
        </div>
      </section>
    );
  }
  