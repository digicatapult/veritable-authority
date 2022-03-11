/**
 * This function is used to render the breadcrumb for the Agent Issuer, Agent
 * Holder, and Agent Verifier pages
 * @returns A breadcrumb.
 */
import Breadcrumb from '../../../AgentAuthority/Breadcrumb'

export default function BreadcrumbWrap({ children, status }) {
  return (
    <div className="col-md-8">
      <ul className="breadcrumb bg-light m-1 p-2">
        {children && children}
        {!children && status !== 'fetched' && (
          <li className="breadcrumb-item"> &nbsp; </li>
        )}
        {!children && status === 'fetched' && <Breadcrumb />}
      </ul>
    </div>
  )
}
