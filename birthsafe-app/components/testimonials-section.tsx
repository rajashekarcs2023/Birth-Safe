export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm dark:bg-gray-900">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hear from Our Users</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              BirthSafe is helping expectant mothers around the world have safer pregnancies and births.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
            <div>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                "BirthSafe helped me identify a potential complication early in my pregnancy. The risk monitoring
                alerted me to symptoms I would have otherwise ignored."
              </p>
            </div>
            <div>
              <p className="font-semibold">Maria T.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">First-time mother</p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
            <div>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                "The decision support tools helped me understand my options for birth in plain language. I felt
                empowered to make informed choices about my care."
              </p>
            </div>
            <div>
              <p className="font-semibold">Jasmine K.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mother of two</p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
            <div>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                "After experiencing birth trauma with my first child, the emotional support features helped me process
                my experience and prepare for my second pregnancy."
              </p>
            </div>
            <div>
              <p className="font-semibold">Aisha M.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mother of two</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

