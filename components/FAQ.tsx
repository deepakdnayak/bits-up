export default function FAQ() {
    return (
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto mt-8">
          <details className="border-b py-4">
            <summary className="font-semibold cursor-pointer">Is registration required?</summary>
            <p className="mt-2 text-gray-600">No, you just need your GitHub username to track your score.</p>
          </details>
          <details className="border-b py-4">
            <summary className="font-semibold cursor-pointer">Are quizzes free?</summary>
            <p className="mt-2 text-gray-600">Yes, all quizzes on BitsUp are completely free to play.</p>
          </details>
        </div>
      </section>
    );
  }
  