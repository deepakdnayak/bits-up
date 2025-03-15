export default function HowItWorks() {
    return (
      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8 max-w-5xl mx-auto">
          <div className="w-64 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">1. Select a Quiz</h3>
            <p className="mt-2 text-gray-600">Choose from various categories and topics.</p>
          </div>
          <div className="w-64 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">2. Answer Questions</h3>
            <p className="mt-2 text-gray-600">Attempt questions and submit your answers.</p>
          </div>
          <div className="w-64 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">3. View Score</h3>
            <p className="mt-2 text-gray-600">Check your performance and improve.</p>
          </div>
        </div>
      </section>
    );
  }
  