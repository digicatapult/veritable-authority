/**
 * This function returns a breadcrumb for the issuer page
 * @returns A breadcrumb element.
 */
export default function Breadcrumb() {
  return (
    <>
      <li className="breadcrumb-item">
        <a href="./" onClick={(e) => e.preventDefault()}>
          <span className="text-primary">Home</span>
        </a>
      </li>
    </>
  )
}
