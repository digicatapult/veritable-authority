/**
 * This function is responsible for rendering the left content column of the screen.
 * @returns The `ColumnLeftWrap` component returns a `div` element with a `div`
 * element inside of it.
 */

export default function ColumnLeftWrap() {
  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>Enter Flyer ID</h5>
              <p className="small">View all certificates for a flyer ID</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
