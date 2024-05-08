import React from 'react'

export default function Signup() {
  return (
    <div>
      <div className="shadow-lg rounded-4 signupForm">
        <div className="brand-logo display-3 text-center my-3">ABS</div>
        <form action="">
          <div className="mt-5 row">
            <div className="col-12 col-md-6">
              <label htmlFor="lastName" className="form-label">Nom</label>
              <input type="text" name="lastName" id="lastName" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="lastName" className="form-label">Nom</label>
              <input type="text" name="lastName" id="lastName" className="form-control" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
