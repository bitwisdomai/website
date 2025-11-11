import React from 'react'

const Features = () => {
  const features = [
    {
      number: '01',
      title: 'Deploy Anywhere',
      description: 'We help you generate a comprehensive and customized business model with specific prompts and easy to use dashboard tailored to you business needs, ensuring you get in a great position'
    },
    {
      number: '02',
      title: 'Integrate Seamlessly',
      description: 'With BW you can organize your complete business management and create an effective ecosystem, effortlessly integrate node operations with your existing infrastructure to maintain business continuity with our AI driven tools and dashboard'
    },
    {
      number: '03',
      title: 'Scale Instantly',
      description: 'BW AI is designed to be versatile, adapt to any business requirements in realtime, customize operations and strategies on the go, make change and updates as you grow and scale'
    }
  ]

  return (
    <div className="bg-black text-white py-20 px-28">
      {/* Section Header */}
      <div className="text-center mb-16">
        <button className="bg-brand-primary text-black px-6 py-2 rounded font-semibold mb-8 hover:bg-cyan-400 transition">
          Building Business AI Network Solutions
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.number}
            className="border border-gray-800 rounded-lg p-8 hover:border-brand-primary transition group"
          >
            <div className="text-brand-primary text-4xl font-bold mb-4 group-hover:scale-110 transition">
              {feature.number}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
