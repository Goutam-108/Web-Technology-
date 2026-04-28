import React from "react"


function About() {
  return (
    <>
      <div
        className="container-fluid text-center text-white py-5"
        style={{ backgroundColor: "#14c6e8" }}
      >
        <h1 className="fw-bold">About Sunbeam</h1>
        <p className="mt-3">
          Empowering professionals with cutting-edge training and solutions
          since the late 90's
        </p>
      </div>
      <div className="container my-5">
        <div className="card shadow-sm mb-5">
          <div
            className="card-header text-white fw-bold"
            style={{ backgroundColor: "#14c6e8" }}
          >
            💡 Our Philosophy
          </div>
          <div className="card-body">
            <p>
              At Sunbeam we believe retaining a competitive edge is imperative
              for any individual in today's professional world. Companies are
              restructuring their organizations & reengineering their business
              processes. Not only have the challenges become more demanding,
              but also the rewards of staying at the forefront seem to be
              promising.
            </p>
          </div>
        </div>

        <div className="row g-4">

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header fw-bold text-info">
                ⭐ Our Expertise
              </div>
              <div className="card-body">
                <p>
                  In this scenario, technical & personal skills which provide
                  effective solutions & time critical support are of principal
                  significance for the long term growth of professionals.
                  Sunbeam's expertise in effectively delivering training,
                  solutions & services has made it a favored institution to
                  many students & professionals focused on an aggressive career
                  growth strategy.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header fw-bold text-info">
                🏆 Our Success
              </div>
              <div className="card-body">
                <p>
                  Sunbeam's proven track record in bringing about effective
                  transformations in individuals is backed by a solid
                  understanding of the rapidly changing needs of the industry &
                  the global business scenario. Sunbeam's success has been built
                  on comprehensively researched, innovative training
                  methodologies, deployment of technology and an emphasis on
                  transformational & industry-relevant programs offering
                  value-added services to its clients.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default About
